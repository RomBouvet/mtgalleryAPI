const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mtgalleryDB';
let db;

MongoClient.connect(url, function (err, client) {
  console.log('Connected successfully to server');
  db = client.db(dbName);
});
