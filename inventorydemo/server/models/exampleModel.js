const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const MONGO_URI = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../secrets.json'))).MONGO_URI;

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'starwars'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));


const Schema = mongoose.Schema;

const exampleSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  exampleTitle: { type: String, required: true },
  exampleText: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  created: { type: Date, default: Date.now }
});

const Example = mongoose.model('Example', exampleSchema);

// You must export your model through module.exports
// The collection name should be 'student'
module.exports = Example;
