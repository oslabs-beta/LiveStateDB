const { MongoClient } = require('mongodb');

async function main() {

    const uri = "mongodb+srv://kevin:yZ3BdpdAgYaCsI6K@cluster0.cf7qs2t.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        //call change stream monitor function
        await monitorListingsUsingEventEmitter(client);

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

// Add functions that make DB calls here


async function monitorListingsUsingEventEmitter(client, timeInMs = 60000, pipeline = []){
  //this will listen to events for db = 'inventoryDemo' and collection = 'inventoryitems' 
  const collection = client.db("inventoryDemo").collection("inventoryitems");
  const changeStream = collection.watch(pipeline);
  //listen for changes
  changeStream.on('change', (next) => {
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