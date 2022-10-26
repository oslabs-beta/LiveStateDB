const fs = require('fs')
const path = require('path')
const { initialDbQuery, monitorListingsUsingEventEmitter, unsubscribe } = require('./events/eventHelperFuncs')
//holds current changeStream's open by DB & Collection
const changeStreams = {};
//keeps track of corresponding clients and their respective response objects
const websocketObj = {};
const subscriptionIdObj = {};

const changeStreamOptionsType = {
  database: 'string',
  collection: 'string',
  query: 'string',
  subscriptionId: 'string'
}

module.exports = async (server, changeStreamOptions) => {
  
  const {redis, client} = await require('./database/databaseConnect')(changeStreamOptions);
  const io = require('socket.io')(server, {
    path: '/websocket',
    transports: ["websocket"],
  })
    io.on('connection', async (socket) => { 
      socket.on('setup', async (changeStreamOptions) => {
        for (let prop in changeStreamOptions) {
          if (typeof changeStreamOptions[prop] !== changeStreamOptionsType[prop]) {
            throw new Error(`\x1b[36m${prop} changeStreamOptions should be ${changeStreamOptionsType[prop]}\x1b[0m`)
          }
        }
        try {
          const { subscriptionId, collection, database, query } = changeStreamOptions;
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
            await redis.sadd(subscriptionDbCollectionKeyDbString, [socket.id])
          }
          await redis.sadd('DBCOL' + socket.id, [subscriptionDbCollectionKeyDbString])
          initialDbQuery(dbCollection, query, redis, subscriptionId, io, websocketObj);

          //check if there is already a changestream for the current collection
          if(!changeStreams[database]?.has(collection)) {
            //if database exists in object, add collection to set, if not make an entry with key database equal to new set with collection
            (changeStreams[database]) ? changeStreams[database].add(collection) : changeStreams[database] = new Set([collection])
            await monitorListingsUsingEventEmitter(dbCollection, redis, websocketObj, io);
          }
        } catch (err) {
          if (err) {
            if (err) {
              console.error('setupWebsocket err:', err)
          } else {
            let initialDbQueryError = new Error('An unknown error occured while setting up the websocket')
            console.error(initialDbQueryError)
          }
          }
        }
      })  
      socket.on('depChange', async ({database, collection, query, subscriptionId}) => {
        const currChangeStreamSub = await redis.smembers('DBCOL' + socket.id);
        if('DB' + database + 'COL' + collection != currChangeStreamSub){
          //check to make sure the current open changestream is needed

        }
        const dbCollection = client.db(database).collection(collection);
        //check if the new database/collection have a change streams open
        await unsubscribe(redis, socket.id, websocketObj, subscriptionIdObj, changeStreams);
        //call a function that unsubscribes from all docs for the current subscriptionId
        //add add clients to the DB & Collection's they are subscribed too -- for 'insert' updates
        const subscriptionDbCollectionKeyDbString = 'DB' + database + 'COL' + collection;
        await redis.sadd(subscriptionDbCollectionKeyDbString, [socket.id])
        await redis.sadd('DBCOL' + socket.id, [subscriptionDbCollectionKeyDbString])
        initialDbQuery(dbCollection, query, redis, subscriptionId, io, websocketObj)
      })
      socket.on('disconnect', () => {
        unsubscribe(redis, socket.id, websocketObj, subscriptionIdObj, changeStreams);
      })
    })
}
