let express = require('express');
let setRouter = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mtgalleryDB';
let db;

MongoClient.connect(url, function (err, client) {
  console.log('Connected successfully to server');
  db = client.db(dbName);
});

setRouter.route('/')
  .get((req, res) => {
    db.collection('sets').find({}, {
      projection: {
        _id: 0,
        block: 1,
        code: 1,
        name: 1,
        releaseDate: 1,
        totalSetSize: 1,
        type: 1
      }
    }).toArray(function (err, docs) {
      if (err) {
        console.log(err);
        throw err;
      }
      res.status(200).json(docs);
    });
  });

setRouter.route('/:code')
  .get((req, res) => {
    console.log(req.params);
    db.collection('sets').find({ code: req.params.code }, {
      projection: {
        _id: 0,
        block: 1,
        code: 1,
        name: 1,
        releaseDate: 1,
        totalSetSize: 1,
        type: 1
      }
    }).toArray(function (err, docs) {
      if (err) {
        console.log(err);
        throw err;
      }
      res.status(200).json(docs);
    });
  });

  module.exports = setRouter;