var admin = require('firebase-admin');
var serviceAccount = require('../config/covid-zone-ab949-firebase-adminsdk-tz9dm-933bf12f7d.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://covid-zone-ab949.firebaseio.com"
});

module.exports = admin;