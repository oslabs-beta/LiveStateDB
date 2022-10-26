const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

//Kevin's MongoDB (I did a few things to make Change Stream work -- only works with sharded online URI...local for current dev is fine)
const MONGO_URI = 'mongodb+srv://vividvoltage:coffeeCup@cluster0.ezvco0o.mongodb.net/test';
// const MONGO_URI = 'mongodb://localhost:27017';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'inventoryDemo'
})
  .then(() => console.log('Mongoose connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

// inventory tracker using just item name and quantity
const inventorySchema = new mongoose.Schema({
  item: { type: String, required: true},
  quantity: { type: Number, default: 0 },
  description: { type: String, require: true},
  price: { type: Number, required: true}
});

const inventory = mongoose.model('inventoryItem', inventorySchema);

// You must export your model through module.exports
// The collection name should be 'student'
module.exports = inventory;
