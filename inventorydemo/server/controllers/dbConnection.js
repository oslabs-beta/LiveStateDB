const { MongoClient } = require('mongodb');

  const uri = "mongodb+srv://kevin:yZ3BdpdAgYaCsI6K@cluster0.cf7qs2t.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    client.connect();
  }catch (err) {

  }

module.exports = client;