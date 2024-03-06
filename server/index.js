require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./routes/auth');
const user = require('./routes/user');
const order = require('./routes/order');
const { JwtMiddleware } = require('./lib/middleware');

const app = express();

const { PORT, MONGO_URI } = process.env;

if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch((e) => console.error(e));

app.use(auth);
app.use(JwtMiddleware);
app.use(user);
app.use(order);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});
