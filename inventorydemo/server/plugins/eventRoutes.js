'use strict'
const changeStreams = {};
//document keyed
// const subscriptionDocKeyDb = {};
//client keyed
// const subscriptionClientKeyDb = {};
//collection keyed
const subscriptionDbCollectionKeyDb = {};
//keeps track of corresponding clients and their respective response objects
const responseDb = {};

// SD+ --> subscriptionDocKeyDb
// SC+ --> subscriptionClientKeyDb

const client = require('../controllers/dbConnection');

async function routes (fastify, options) {

  //paste code here from google doc
  fastify.register(require('@fastify/redis'), 
    {host: 'redis-12753.c84.us-east-1-2.ec2.cloud.redislabs.com', 
    port: 12753, 
    password: 'YET7NOQHLnHgL9Yrktjz5Czb8rQL1ezH',
    family: 4})

  fastify.route({
    method: 'GET',
    url: '/event/',
    // this function is executed for every request before the handler is executed,
    handler: async (request, reply) => {
      const genericReply = reply;

      const { redis } = fastify;
      let headers = {
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*',
      }
      reply.raw.writeHead(200, headers);
      reply.raw.flushHeaders();
      reply.raw.write('retry: 10000\n\n')

      const { id, collection, database, query } = request.query;
      
      //check if the user already has a response object entry in the db
      const redisResDb = await redis.get('R' + id);
      if(!redisResDb) {
        redis.set('R' + id, JSON.stringify(reply))
      }

      if(!responseDb[id]) responseDb[id] = reply;

      const dbCollection = client.db(database).collection(collection);
      const subscriptionDbCollectionKeyDbString = 'DB' + database + 'COL' + collection;
      const redisSubscriptionDbCollectionKeyDb = await redis.sismember(subscriptionDbCollectionKeyDbString, id);
      if(redisSubscriptionDbCollectionKeyDb === 0){
        await redis.sadd(subscriptionDbCollectionKeyDbString, [id])
      }
      const test = await redis.smembers(subscriptionDbCollectionKeyDbString);
      (subscriptionDbCollectionKeyDb[subscriptionDbCollectionKeyDbString]) ? 
      subscriptionDbCollectionKeyDb[subscriptionDbCollectionKeyDbString].add(id) : 
      subscriptionDbCollectionKeyDb[subscriptionDbCollectionKeyDbString] = new Set ([id])

      //find documents that are querried
      const initialDbQuery = async () => {
        const data = await dbCollection.find(JSON.parse(query)).toArray()
        console.log
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
      initialDbQuery();

      //check if there is already a changestream for
      if(!changeStreams[database]?.has(collection)) {
        //if database exists in object, add collection to set, if not make an entry with key database equal to new set with collection
        (changeStreams[database]) ? changeStreams[database].add(collection) : changeStreams[database] = new Set([collection])
        await monitorListingsUsingEventEmitter(dbCollection, redis);
      }

    }
  })
}

//write helper function here for checking our redis databases for subscribed clients to send response to 
const redisCrossCheck = async (set, redis, next) => {
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

async function monitorListingsUsingEventEmitter(client, redis, timeInMs = 600000, pipeline = []){
  const changeStream = client.watch(pipeline);
  //listen for changes
  changeStream.on('change', async (next) => {
    //check if it's an insertion event
    if(next.operationType === 'insert'){
      const { db, coll } = next.ns;
      const concatString = 'DB' + db + 'COL' + coll;
      const clientsSubscribedToCollection = await redis.smembers('DB' + db + 'COL' + coll)
      redisCrossCheck(clientsSubscribedToCollection, redis, next);
    }
    const changeStreamDocId = next.documentKey._id.toString();
    const redisSubDocKey = await redis.smembers('SD' + changeStreamDocId);
    redisCrossCheck(redisSubDocKey, redis, next);
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

module.exports = routes;