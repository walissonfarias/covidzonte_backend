var admin = require('firebase-admin');
var serviceAccount = require('../config/covidzone-1f4d6-firebase-adminsdk-rbgc6-b355796f08.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://covidzone-1f4d6.firebaseio.com"
});

module.exports = admin;