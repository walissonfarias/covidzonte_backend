const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.DATABASE_URL;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { connection } = mongoose;
connection.on('error', (error) => console.error(error));
connection.once('open', () => console.log('Connected to Mongoose'));

module.exports = mongoose;
