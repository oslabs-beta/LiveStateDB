const { MongoClient } = require('mongodb');

const connectToMongoDb = async (mongoUri) => {
  const uri = "mongodb+srv://kevin:yZ3BdpdAgYaCsI6K@cluster0.cf7qs2t.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    return client;
  }catch (err) {
    
  }
}

module.exports = connectToMongoDb;