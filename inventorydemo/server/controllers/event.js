const { createErr } = require('../utils/utils');
const db = require('../fakeRedis/fakeRedis')

const eventController = {};
const currentChangeStreams = {};
const clients = {};

eventController.connection = async (req, res, next) => {
  const { id, collection, database, query } = req.query;

    // console.log(id);
  console.log(req.query);


  //!!!add logic for checking if client data is already part of change stream
  //!!!if it is we do not open a new connection
  // if(!currentChangeStreams[database][collection]){
  //   connectToDb(res, true).catch(console.error);
  //   currentChangeStreams[database][collection] = true;
  // }
  //check database for subscribed documents

  connectToDb(res, true).catch(console.error);
  
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();

  //tells client to retry every 10 seconds if connection is lost
  res.write('retry: 10000\n\n')
  let count = 0;

  //!!!write logic for retrieving intial state data and writing it to the response
  // res.write({type: 'initialState', ...result form db query})

}

const { MongoClient } = require('mongodb');

async function connectToDb(res, newConnection = false) {

    const uri = "mongodb+srv://kevin:yZ3BdpdAgYaCsI6K@cluster0.cf7qs2t.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        if(newConnection) await client.connect();

        //call change stream monitor function
        await monitorListingsUsingEventEmitter(client, res);

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

async function monitorListingsUsingEventEmitter(client, res, timeInMs = 600000, pipeline = []){
  //this will listen to events for db = 'inventoryDemo' and collection = 'inventoryitems' 
  const collection = client.db("inventoryDemo").collection("inventoryitems");
  const changeStream = collection.watch(pipeline);
  //listen for changes
  changeStream.on('change', (next) => {
    res.write(`data: ${JSON.stringify(next)}\n\n`)
    console.log(next);
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
