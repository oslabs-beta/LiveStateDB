'use strict'
const cors = require('@fastify/cors')
//holds current changeStream's open by DB & Collection
const changeStreams = {};

//keeps track of corresponding clients and their respective response objects
const replyObjs = {};

const { initialDbQuery, monitorListingsUsingEventEmitter } = require('./eventHelperFuncs')
const connectToMongoDb = require('../mongoDb/mongoConnection')

// SD+ --> subscriptionDocKeyDb
// SC+ --> subscriptionClientKeyDb
// --> 

async function routes (fastify, options) {
  const { mongoDbOptions, redisDbOptions } = options;

  const client = await connectToMongoDb(mongoDbOptions.uri)

  fastify.register(require('@fastify/redis'), redisDbOptions)
  await fastify.register(cors, { 
    origin: {String: '*'}
  })

  fastify.route({
    method: 'DELETE',
    url: '/event/*',
    // this function is executed for every request before the handler is executed,
    handler: async (request, reply) => {
      const { redis } = fastify;
      const { subscriptionId } = request.query
      const headers = {
        'Connection': 'close'
      }
      console.log(replyObjs[subscriptionId]);
      replyObjs[subscriptionId].raw.writeHead(200, headers);

      reply.send({hello: 'world'})
      //call some helper functino to unsubscribe
    }
  })

  fastify.route({
    method: 'GET',
    url: '/event/*',
    // this function is executed for every request before the handler is executed,
    handler: async (request, reply) => {
      const { redis } = fastify;
      const headers = {
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*',
      }
      reply.raw.writeHead(200, headers);
      reply.raw.flushHeaders();
      reply.raw.write('retry: 10000\n\n')

      const { subscriptionId, collection, database, query } = request.query;

      //keep track of connection/reply object by clientsubscriptionId
      if(!replyObjs[subscriptionId]) replyObjs[subscriptionId] = reply;

      //connect to the current collection
      const dbCollection = client.db(database).collection(collection);

      //add add clients to the DB & Collection's they are subscribed too -- for 'insert' updates
      const subscriptionDbCollectionKeyDbString = 'DB' + database + 'COL' + collection;
      const redisClientIsSubscribedToCollection = await redis.sismember(subscriptionDbCollectionKeyDbString, subscriptionId);
      if(redisClientIsSubscribedToCollection === 0){
        await redis.sadd(subscriptionDbCollectionKeyDbString, [subscriptionId])
      }
      
      initialDbQuery(dbCollection, query, redis, subscriptionId, reply);

      //check if there is already a changestream for the current collection
      if(!changeStreams[database]?.has(collection)) {
        //if database exists in object, add collection to set, if not make an entry with key database equal to new set with collection
        (changeStreams[database]) ? changeStreams[database].add(collection) : changeStreams[database] = new Set([collection])
        await monitorListingsUsingEventEmitter(dbCollection, redis, replyObjs);
      }
    }
  })
}

module.exports = routes;