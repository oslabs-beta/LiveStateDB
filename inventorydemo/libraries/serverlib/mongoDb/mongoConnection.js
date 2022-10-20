const { MongoClient } = require('mongodb');

const connectToMongoDb = async (mongoUri) => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    return client;
  }catch (err) {
    
  }
}

module.exports = connectToMongoDb;