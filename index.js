const express = require('express');
var cors = require('cors');
const cardRouter = require('./routers/cards');
const app = express();

app.use(cors());

/**
 * Import MongoClient & connexion à la DB
 */


app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello there');
});

app.listen(8000, function () {
  console.log("hello there");
});
//app.use('/', cardRouter);
/*app.get('/sets', (req, res) => {
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

app.get('/sets/:code', (req, res) => {
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
});*/