const Router = require('express');
const db = require('../fakeRedis/fakeRedis')

const router = Router();

router.use((req, res, next) => {
  console.log(`server/routes/event.js: received request ${req.method} ${req.url}`);
  next();
});

const { MongoClient } = require('mongodb');

async function connectToDb(res) {

    const uri = "mongodb+srv://kevin:yZ3BdpdAgYaCsI6K@cluster0.cf7qs2t.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

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

router.get('/', async (req, res) => {
  console.log(`server/routes/event.js.router.get('/'): received request ${req.method} ${req.url}`);
  const { id } = req.query;

  connectToDb(res).catch(console.error);
  //check database for subscribed documents

  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();

  //tells client to retry every 10 seconds if connection is lost
  res.write('retry: 10000\n\n')
  let count = 0;



  // while (true) {
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   console.log('Emit', ++count)
  //   //Emite an SSE that contains the current 'count' as a string
  //   res.write(`data: ${count}\n\n`)
  // }
});


//general handeler if request not found/handled
router.use((req, res) => {
  console.log(`server/routes/api.js: handler not found for request ${req.method} ${req.url}`);
  res
    .status(404)
    .json({
      message: `Inventory handler for ${req.method} ${req.url} not found`,
    });
});

module.exports = router;
