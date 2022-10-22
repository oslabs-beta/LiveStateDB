const eventRouteHelperFuncs = {};

//find documents that are querried
eventRouteHelperFuncs.initialDbQuery = async (dbCollection, query, redis, subscriptionId, io, websocketObj) => {
  try {
    const data = await dbCollection.find(JSON.parse(query)).toArray()  
    // console.log('QUERY', query);
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
  } catch (err) {
    if (err) {
      console.log(`Error occured while subscribing or unsubscribing to the DB query.  errName: ${err.name}, errMessage: ${err.message}, errStack: ${err.stack}`)
    } else {
      let initialDbQueryError = new Error('An unknown error occured while subscribing or unsubscribing to the DB query')
      console.log(initialDbQueryError)
    }
  }  
}

//write helper function here for checking our redis databases for subscribed clients to send response to 
const sendReplyToSubscribers = async (setOfSubscriptionIds, redis, changeStreamObj, websocketObj, io) => {
  for(const subscriptionId of setOfSubscriptionIds) {
    try {
      // if we fail to write to a client we want to mark the client for removal
      io.to(websocketObj[subscriptionId]).emit('change', JSON.stringify({type: changeStreamObj.operationType, data: changeStreamObj}))
    } catch (err) {
        if (err) {
          console.log(`Error occured in sending reply to subscribers.  errName: ${err.name}, errMessage: ${err.message}, errStack: ${err.stack}`) 
        } else {
          let subscriberReplyError = new Error('An unknown error occured in sending reply to subscribers')
          console.log(subscriberReplyError)
        }
      }  
  }
}

eventRouteHelperFuncs.monitorListingsUsingEventEmitter =  async (client, redis, websocketObj, io, timeInMs = 6000000, pipeline = []) => {
  const changeStream = client.watch(pipeline);
  //listen for changes
  changeStream.on('change', async (changeStreamObj) => {
    //check if it's an insertion event
    if(changeStreamObj.operationType === 'insert'){
      try {
      const { db, coll } = changeStreamObj.ns;
      // store set of Subscription Ids for collection
      const redisSubscriptionIdsSubscribedToCollection = await redis.smembers('DB' + db + 'COL' + coll);
      // iterate through subscription IDs
      for(let subscriptionId of redisSubscriptionIdsSubscribedToCollection){
        // for each subscription ID check to see if it is in the set stored at subscribed Doc
        const redisClientIsSubscribedToDocument = await redis.sismember('SD' + changeStreamObj.documentKey._id.toString(), subscriptionId);
        // if not subscribed
        if(redisClientIsSubscribedToDocument === 0){
          // add subscription ID to doc ID key
          await redis.sadd('SD' + changeStreamObj.documentKey._id.toString(), [subscriptionId]);
        }
        // store set of Documents subscribed to Client 
        const redisDocumentIsSubscribedToClient = await redis.sismember('SC' + subscriptionId, changeStreamObj.documentKey._id.toString());
        // if not subscribed
        if(redisDocumentIsSubscribedToClient === 0){
          // add docID to subscription ID key
          await redis.sadd('SC' + subscriptionId, [changeStreamObj.documentKey._id.toString()]);
        }
      } 
      sendReplyToSubscribers(redisSubscriptionIdsSubscribedToCollection, redis, changeStreamObj, websocketObj, io);
    } catch (err) {
      if (err) {
        console.log(`Unable to save new subscriptions in Redis.  errName: ${err.name}, errMessage: ${err.message}, errStack: ${err.stack}`)
        
      } else {
        let initialDbQueryError = new Error('An unknown error occured while attempting to save new subscriptions in Redis')
        console.log(initialDbQueryError)
      }
    }
    }
    try {
    // store all subscribers for a particular document 
    const redisSubscriptionIdsSubscribedToDocument = await redis.smembers('SD' + changeStreamObj.documentKey._id.toString());
    sendReplyToSubscribers(redisSubscriptionIdsSubscribedToDocument, redis, changeStreamObj, websocketObj, io);
    } catch (err) {
      if (err) {
        console.log(`Unable to access subscriptions in Redis.  errName: ${err.name}, errMessage: ${err.message}, errStack: ${err.stack}`)
        
      } else {
        let initialDbQueryError = new Error('An unknown error occured while attempting to access subscriptions in Redis')
        console.log(initialDbQueryError)
      }
    }
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