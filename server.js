const express = require('express');
let cors = require('cors');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mtgalleryDB', {useNewUrlParser: true, useUnifiedTopology: true});

const cardRouter = require('./routers/cards');
const setRouter = require('./routers/sets');

app.use(cors());
app.use(express.json());
app.use('/cards', cardRouter);
app.use('/sets', setRouter);


app.listen(8080, () => {
  console.log('Server started on port 8080');
});