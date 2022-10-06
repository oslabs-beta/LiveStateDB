const { createErr } = require('../utils/utils');
const db = require('../fakeRedis/fakeRedis')
const client = require('./dbConnection');

const subscriptionDb = JSON.parse(db)
subscriptionDb.user1.docs = new Set(subscriptionDb.user1.docs)

eventController = {};

eventController.connection = async (req, res, next) => {

  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();

  //tells client to retry every 10 seconds if connection is lost
  res.write('retry: 10000\n\n')

  const { id, collection, database, query } = req.query;

  const dbCollection = client.db(database).collection(collection);
  //find documents that are querried
  dbCollection.find(JSON.parse(query)).toArray()
    .then((data) => res.write(`data: ${JSON.stringify({type: 'get', data: data})}\n\n`))
  //!! add documents to database if no entry with user as value
  //!! if there is an entry append the user to the set of values


  //!!check if there is already a changestream for
  await monitorListingsUsingEventEmitter(dbCollection, res, subscriptionDb);
  


  // res.write({type: 'initialState', ...result form db query})

}


//!! make sure this is only called once for each collection
async function monitorListingsUsingEventEmitter(client, res, subscriptionDb, timeInMs = 600000, pipeline = []){
  const changeStream = client.watch(pipeline);
  //listen for changes
  console.log('change stream is on');
  changeStream.on('change', (next) => {
    //!! check to see who is subscribed to the document that is being changed
    //!! get the res objects for all subscribers
    //!! iterate over all res objects writing the change stream
    console.log(subscriptionDb.user1.docs)
    console.log(next.documentKey._id.toString())
    console.log(next);
    if(subscriptionDb.user1.docs.has(next.documentKey._id.toString())){
      res.write(`data: ${JSON.stringify({type: next.operationType, data: next})}\n\n`)
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



module.exports = eventController;