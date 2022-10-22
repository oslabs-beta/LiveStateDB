'use strict'
const fs = require('fs')
const path = require('path')
const { initialDbQuery, monitorListingsUsingEventEmitter, unsubscribe } = require('../serverlib/events/eventHelperFuncs')
//holds current changeStream's open by DB & Collection
const changeStreams = {};
//keeps track of corresponding clients and their respective response objects
const websocketObj = {};
const subscriptionIdObj = {};

module.exports = async (server, changeStreamOptions) => {
  const {redis, client} = await require('./stateServer')(changeStreamOptions);
  const io = require('socket.io')(server, {
    path: '/websocket',
    transports: ["websocket"],
  })
    io.on('connection', async (socket) => { 
      socket.on('setup', async (changeStreamOptions) => {
        const { subscriptionId, collection, database, query } = changeStreamOptions;
        console.log('query', query);
        console.log('changeSteamOptions', changeStreamOptions)
        //keep track of connection/reply object by clientsubscriptionId
        if(!websocketObj[subscriptionId]) websocketObj[subscriptionId] = socket.id;
        //!! can use redis for this later
        (subscriptionIdObj[socket.id]) ? 
          subscriptionIdObj[socket.id].add(subscriptionId) :
          subscriptionIdObj[socket.id] = new Set([subscriptionId])

        //connect to the current collection
        const dbCollection = client.db(database).collection(collection);

        //add add clients to the DB & Collection's they are subscribed too -- for 'insert' updates
        const subscriptionDbCollectionKeyDbString = 'DB' + database + 'COL' + collection;
        const redisClientIsSubscribedToCollection = await redis.sismember(subscriptionDbCollectionKeyDbString, subscriptionId);
        if(redisClientIsSubscribedToCollection === 0){
          await redis.sadd(subscriptionDbCollectionKeyDbString, [subscriptionId])
        }
        
        initialDbQuery(dbCollection, query, redis, subscriptionId, io, websocketObj);

        //check if there is already a changestream for the current collection
        if(!changeStreams[database]?.has(collection)) {
          //if database exists in object, add collection to set, if not make an entry with key database equal to new set with collection
          (changeStreams[database]) ? changeStreams[database].add(collection) : changeStreams[database] = new Set([collection])
          await monitorListingsUsingEventEmitter(dbCollection, redis, websocketObj, io);
        }
      })
      socket.on('depChange', async ({database, collection, query, subscriptionId}) => {
        const dbCollection = client.db(database).collection(collection);
        //call a function that unsubscribes from all docs for the current subscriptionId
        initialDbQuery(dbCollection, query, redis, subscriptionId, io, websocketObj)
      })
      socket.on('disconnect', () => {
        unsubscribe(redis, socket.id, websocketObj);
      })
    })
}
