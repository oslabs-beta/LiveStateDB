const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

//David's MongoDB
const MONGO_URI = 'mongodb+srv://test1:test2@testcluster.jzy95ve.mongodb.net/test';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'inventoryDemo'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));


const Schema = mongoose.Schema;

//example inventory tracker using just item name and quantity
const inventorySchema = new mongoose.Schema({
  item: { type: String, required: true},
  quantity: { type: Number, default: 0 },
});

const inventory = mongoose.model('inventoryItem', inventorySchema);

// You must export your model through module.exports
// The collection name should be 'student'
module.exports = inventory;
