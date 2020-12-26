const mongoose = require('mongoose');
let express = require('express');
let cardRouter = express.Router();

const db = mongoose.connection;
db.on('error', /* throw error */ console.error.bind(console, 'connection error:'));
db.once('open', () => { });

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
  });

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
        },
        {
          $lookup: {
            from: "sets",
            as: "printings",
            let: { printings: "$printings" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$code", "$$printings"]
                  }
                }
              },
              {
                $project: {
                  _id: 0,
                  name: 1,
                  releaseDate: 1,
                  code: 1
                },
              }
            ]
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
  });

module.exports = cardRouter;