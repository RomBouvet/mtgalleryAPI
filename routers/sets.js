const mongoose = require('mongoose');
let express = require('express');
let setRouter = express.Router();

const db = mongoose.connection;
db.on('error', /* throw error */ console.error.bind(console, 'connection error:'));
db.once('open', () => {});

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
        type: 1
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