// eventRouteHelperFuncs = {};

//! File originally written without const declaration, but didn't error -> WHY?
const eventRouteHelperFuncs = {}

//find documents that are querried
eventRouteHelperFuncs.initialDbQuery = async (dbCollection, query, redis, subscriptionId, io, websocketObj) => {
  const data = await dbCollection.find(JSON.parse(query)).toArray()
  console.log('QUERY', query);
    //iterate through the array of objects from the db
    for(let objs of data){
      //check if the object's id has an entry in the subscription db
      //'SD'+
      const redisClientIsSubscribedToDocument = await redis.sismember('SD' + objs._id, subscriptionId);
      if(redisClientIsSubscribedToDocument === 0){
        await redis.sadd('SD' + objs._id, [subscriptionId]);
      }
      
      //check if the document is in the clients subscriptions
      const redisDocumentIsSubscribedToClient = await redis.sismember('SC' + subscriptionId, objs._id);
      if(redisDocumentIsSubscribedToClient === 0){
        await redis.sadd('SC' + subscriptionId, [objs._id]);
      }
    }
    io.to(websocketObj[subscriptionId]).emit('change', JSON.stringify({type: 'get', data: data}))
}

//write helper function here for checking our redis databases for subscribed clients to send response to 
const sendReplyToSubscribers = async (setOfSubscriptionIds, redis, changeStreamObj, websocketObj, io) => {
  for(const subscriptionId of setOfSubscriptionIds) {
    // try {
      //if we fail to write to a client we want to mark the client for removal
      io.to(websocketObj[subscriptionId]).emit('change', JSON.stringify({type: changeStreamObj.operationType, data: changeStreamObj}))
      // const success = await websocketObj[subscriptionId]?.raw.write(`data: ${JSON.stringify({type: changeStreamObj.operationType, data: changeStreamObj})}\n\n`)
    //   if(!success) {
    //     const setOfFailedReplyDocumentIds = await redis.smembers('SC' + subscriptionId)
    //     for(const docs of setOfFailedReplyDocumentIds){
    //       redis.srem('SD' + docs, subscriptionId)
    //     }
    //     redis.del('SC' + subscriptionId);
    //   }
    // }catch (err) {
    //   console.log(`unable to update user with id: ${subscriptionId}`)
    // }
  }
}

eventRouteHelperFuncs.monitorListingsUsingEventEmitter =  async (client, redis, websocketObj, io, timeInMs = 6000000, pipeline = []) => {
  const changeStream = client.watch(pipeline);
  //listen for changes
  changeStream.on('change', async (changeStreamObj) => {
    //check if it's an insertion event
    if(changeStreamObj.operationType === 'insert'){
      const { db, coll } = changeStreamObj.ns;
      //
      const redisSubscriptionIdsSubscribedToCollection = await redis.smembers('DB' + db + 'COL' + coll);
      for(let subscriptionId of redisSubscriptionIdsSubscribedToCollection){
        const redisClientIsSubscribedToDocument = await redis.sismember('SD' + changeStreamObj.documentKey._id.toString(), subscriptionId);
        if(redisClientIsSubscribedToDocument === 0){
          await redis.sadd('SD' + changeStreamObj.documentKey._id.toString(), [subscriptionId]);
        }
        const redisDocumentIsSubscribedToClient = await redis.sismember('SC' + subscriptionId, changeStreamObj.documentKey._id.toString());
        if(redisDocumentIsSubscribedToClient === 0){
          await redis.sadd('SC' + subscriptionId, [changeStreamObj.documentKey._id.toString()]);
        }
      }
      sendReplyToSubscribers(redisSubscriptionIdsSubscribedToCollection, redis, changeStreamObj, websocketObj, io);
    }

    const redisSubscriptionIdsSubscribedToDocument = await redis.smembers('SD' + changeStreamObj.documentKey._id.toString());
    sendReplyToSubscribers(redisSubscriptionIdsSubscribedToDocument, redis, changeStreamObj, websocketObj, io);
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