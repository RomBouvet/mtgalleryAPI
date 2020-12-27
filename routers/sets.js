const mongoose = require('mongoose');
let express = require('express');
let setRouter = express.Router();

const db = mongoose.connection;
db.on('error', /* throw error */ console.error.bind(console, 'connection error:'));
db.once('open', () => { });

setRouter.route('/')
  .get((req, res) => {
    db.collection('sets').aggregate(
      [
        {
          $project: {
            _id: 0,
            block: 1,
            code: 1,
            name: 1,
            releaseDate: 1,
            totalSetSize: 1,
            type: 1
          }
        },
        {
          $sort: {
            releaseDate: -1,
            _id: 1
          }
        }
       /* {
          $unwind: "$cards"
        },
        {
          $addFields: {
            "cards.sRarity": {
              $cond: {
                if: { $eq: ["$cards.rarity", "mythic"] },
                then: 1,
                else: {
                  $cond: {
                    if: { $eq: ["$cards.rarity", "rare"] },
                    then: 2,
                    else: 3
                  }
                }
              }
            }
          }
        },
        {
          $sort: {
            "cards.sRarity": 1
          }
        },
        {
          $group: {
            _id: "$code",
            code: { $first: "$code" },
            name: { $first: "$name" },
            releaseDate: { $first: "$releaseDate" },
            cards: { $push: "$cards" }
          }
        },
        {
          $project: {
            code: 1,
            name: 1,
            releaseDate: 1,
            thumbnailCardId: { 
              $first: { 
                  $ifNull: [ "$cards.identifiers.multiverseId", "unknown" ]
              }
            }
          }
        }
        {
          $match: {
            "cards.rarity": "mythic"
          }
        },
        {
          $group: {
            _id: "$code",
            code: { $first: "$code" },
            name: { $first: "$name" },
            releaseDate: { $first: "$releaseDate" },
            thumbnailCardId: { $first: "$cards.identifiers.multiverseId" },
            test: { $first: "$sRarity" },
            test2: { $first: "$cards.rarity" }
          }
        },
        {
          $project: {
            _id: 0
          }
        }*/
      ], { "allowDiskUse": true }
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
        type: 1,
        cards: 1
      }
    }).toArray(function (err, docs) {
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

module.exports = setRouter;