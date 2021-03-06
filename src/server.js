const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const helmet = require('helmet');
const firebase = require('firebase');
const admin = require('firebase-admin');
require('firebase/auth');

const routes = require('./routes');
const Config = require('./config/firebase-config');

firebase.initializeApp(Config.firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(Config.adminConfig),
});

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res) => {
  const statusCode = err.status || 500;
  // Return error
  return res.status(statusCode).json({
    code: statusCode,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`API server started on port ${port}`);
});
