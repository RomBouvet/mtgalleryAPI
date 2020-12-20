const express = require('express')
var cors = require('cors')
const app = express()

app.use(cors());

/**
 * Import MongoClient & connexion à la DB
 */
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mtgalleryDB';
let db;

MongoClient.connect(url, function (err, client) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
});


app.use(express.json())

app.get('/sets', (req, res) => {
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
      console.log(err)
      throw err
    }
    res.status(200).json(docs)
  })
})

app.get('/sets/:code', (req, res) => {
  console.log(req.params)
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
      console.log(err)
      throw err
    }
    res.status(200).json(docs)
  })
})

app.get('/cards', (req, res) => {
  db.collection('sets').aggregate(

    // Pipeline
    [
      // Stage 1
      {
        $project: {
          "cards.identifiers.multiverseId": 1,
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
          newRoot: "$cards.identifiers"
        }
      },
      {
        $project: {
          "id": "$multiverseId"
        }
      }
    ]
  ).toArray(function (err, docs) {
    if (err) {
      console.log(err)
      throw err
    }
    res.status(200).json(docs)
  })
})

app.get('/cards/:id', (req, res) => {
  db.collection('sets').aggregate(
    // Pipeline
    [
      {
        $unwind: {
          path: "$cards"
        }
      },
      {
        $match: {
          "cards.identifiers.multiverseId": req.params.id
        },
      },
      {
        $replaceRoot: {
          newRoot: "$cards"
        }
      },
      {
        $addFields: {
          "id": "$identifiers.multiverseId"
        }
      }
    ]
  ).toArray(function (err, docs) {
    if (err) {
      console.log(err)
      throw err
    }
    res.status(200).json(docs)
  })
})

app.listen(8080, () => {
  console.log("Serveur à l'écoute")
})