import * as admin from "firebase-admin";
var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://covid-zone-ab949.firebaseio.com"
});
export default admin;