let express = require('express');
let cardRouter = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mtgalleryDB';
let db;

MongoClient.connect(url, function (err, client) {
  console.log('Connected successfully to server');
  db = client.db(dbName);
});

cardRouter.route('/')
  .get((req, res) => {
    db.collection('sets').aggregate(

      // Pipeline
      [
        // Stage 1
        {
          $project: {
            'cards.identifiers.multiverseId': 1,
            _id: 0
          }
        },
        {
          $unwind: {
            path: '$cards'
          }
        },
        {
          // skip req.page*100
          $skip: 0
        },
        {
          $limit: 10
        },
        {
          $replaceRoot: {
            newRoot: '$cards.identifiers'
          }
        },
        {
          $project: {
            'id': '$multiverseId'
          }
        }
      ]
    ).toArray(function (err, docs) {
      if (err) {
        console.log(err);
        throw err;
      }
      res.status(200).json(docs);
    });
  })
  .post((req, res) => {
    res.send('not supported');
  })
  .put((req, res) => {
    res.send('not supported');
  })
  .delete((req, res) => {
    res.send('not supported');
  })

cardRouter.route('/:id')
  .get((req, res) => {
    db.collection('sets').aggregate(
      // Pipeline
      [
        {
          $unwind: {
            path: '$cards'
          }
        },
        {
          $match: {
            'cards.identifiers.multiverseId': req.params.id
          },
        },
        {
          $replaceRoot: {
            newRoot: '$cards'
          }
        },
        {
          $addFields: {
            'id': '$identifiers.multiverseId'
          }
        }
      ]
    ).toArray(function (err, docs) {
      if (err) {
        console.log(err);
        throw err;
      }
      res.status(200).json(docs);
    });
  })
  .post((req, res) => {
    res.send('not supported');
  })
  .put((req, res) => {
    res.send('not supported');
  })
  .delete((req, res) => {
    res.send('not supported');
  })

  module.exports = cardRouter;