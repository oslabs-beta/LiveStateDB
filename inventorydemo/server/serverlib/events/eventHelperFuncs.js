eventRouteHelperFuncs = {};

//find documents that are querried
eventRouteHelperFuncs.initialDbQuery = async (dbCollection, query, redis, id, reply) => {
  const data = await dbCollection.find(JSON.parse(query)).toArray()
  console.log('QUERY', query);
    //iterate through the array of objects from the db
    for(let objs of data){
      //check if the object's id has an entry in the subscription db
      //'SD'+
      const redisSubscriptionDocKeyDb = await redis.sismember('SD' + objs._id, id);
      if(redisSubscriptionDocKeyDb === 0){
        await redis.sadd('SD' + objs._id, [id]);
      }
      
      //check if the document is in the clients subscriptions
      const redisSubscriptionClientKeyDb = await redis.sismember('SC' + id, objs._id);
      if(redisSubscriptionClientKeyDb === 0){
        await redis.sadd('SC' + id, [objs._id]);
      }
    }
    reply.raw.write(`data: ${JSON.stringify({type: 'get', data: data})}\n\n`)
}

//write helper function here for checking our redis databases for subscribed clients to send response to 
const redisCrossCheck = async (set, redis, next, responseDb) => {
  for(const ele of set) {
    try {
      //if we fail to write to a client we want to mark the client for removal
      const success = await responseDb[ele]?.raw.write(`data: ${JSON.stringify({type: next.operationType, data: next})}\n\n`)
      if(!success) {
        const failure = await redis.smembers('SC' + ele)
        for(const docs of failure){
          redis.srem('SD' + docs, ele)
        }
      }
    }catch (err) {
      console.log(`unable to update user with id: ${ele}`)
    }
  }
}

eventRouteHelperFuncs.monitorListingsUsingEventEmitter =  async (client, redis, responseDb, timeInMs = 6000000, pipeline = []) => {
  const changeStream = client.watch(pipeline);
  //listen for changes
  changeStream.on('change', async (next) => {
    //check if it's an insertion event
    if(next.operationType === 'insert'){
      const { db, coll } = next.ns;
      const concatString = 'DB' + db + 'COL' + coll;
      const clientsSubscribedToCollection = await redis.smembers('DB' + db + 'COL' + coll)
      redisCrossCheck(clientsSubscribedToCollection, redis, next, responseDb);
    }
    const changeStreamDocId = next.documentKey._id.toString();
    const redisSubDocKey = await redis.smembers('SD' + changeStreamDocId);
    redisCrossCheck(redisSubDocKey, redis, next, responseDb);
  });
  await closeChangeStream(timeInMs, changeStream);
}

//this function will close the stream after a specified amount of time
function closeChangeStream(timeInMs, changeStream) {
  return new Promise((resolve) => {
      setTimeout(() => {
          console.log("Closing the change stream");
          changeStream.close();
          resolve();
      }, timeInMs)
  })
};

module.exports = eventRouteHelperFuncs;