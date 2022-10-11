'use strict'

//holds current changeStream's open by DB & Collection
const changeStreams = {};

//A list of clients subscribed to Collections {('DB' + db + 'COL' + coll) : clientId}
const subscriptionDbCollectionKeyDb = {};

//keeps track of corresponding clients and their respective response objects
const responseDb = {};

const { initialDbQuery, monitorListingsUsingEventEmitter } = require('./eventRouteHelperFuncs')

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

      //keep track of connection/reply object by clientId
      if(!responseDb[id]) responseDb[id] = reply;

      //connect to the current collection
      const dbCollection = client.db(database).collection(collection);

      //add add clients to the DB & Collection's they are subscribed too -- for 'insert' updates
      const subscriptionDbCollectionKeyDbString = 'DB' + database + 'COL' + collection;
      const redisSubscriptionDbCollectionKeyDb = await redis.sismember(subscriptionDbCollectionKeyDbString, id);
      if(redisSubscriptionDbCollectionKeyDb === 0){
        await redis.sadd(subscriptionDbCollectionKeyDbString, [id])
      }


      initialDbQuery(dbCollection, query, redis, id, reply);

      //check if there is already a changestream for
      if(!changeStreams[database]?.has(collection)) {
        //if database exists in object, add collection to set, if not make an entry with key database equal to new set with collection
        (changeStreams[database]) ? changeStreams[database].add(collection) : changeStreams[database] = new Set([collection])
        await monitorListingsUsingEventEmitter(dbCollection, redis, responseDb);
      }
    }
  })
}

module.exports = routes;