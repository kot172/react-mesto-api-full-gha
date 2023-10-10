require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
// const { MongoClient, ServerApiVersion } = require('mongodb')


const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/testdb' } = process.env;

const app = express();

app.use(cors());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(requestLogger);

app.use(limiter);

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
