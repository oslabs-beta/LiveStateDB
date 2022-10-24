const { MongoClient } = require('mongodb');

const connectToMongoDb = async (mongoUri) => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    return client;
  }catch (err) {
    if (err) {
      console.log(`Error occured when connecting to MongoDB.  errName: ${err.name}, errMessage: ${err.message}, errStack: ${err.stack}`)
      
    } else {
      let mongoDbError = new Error('An unknown error occured when connecting to MongoDB')
      console.log(mongoDbError)
    }
  }
}

module.exports = connectToMongoDb;