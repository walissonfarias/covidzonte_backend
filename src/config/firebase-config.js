require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
};
const adminConfig = {
  type: process.env.ADMIN_TYPE,
  project_id: process.env.FIREBASE_PROJECTID,
  private_key_id: process.env.ADMIN_PRIVATEKEYID,
  private_key: process.env.ADMIN_PRIVATEKEY.replace(/\\n/g, '\n'),
  client_email: process.env.ADMIN_CLIENTEMAIL,
  client_id: process.env.ADMIN_CLIENTID,
  auth_uri: process.env.ADMIN_AUTHURI,
  token_uri: process.env.ADMIN_TOKENURI,
  auth_provider_x509_cert_url: process.env.ADMIN_AUTHPROVIDER,
  client_x509_cert_url: process.env.ADMIN_CLIENT,
};

module.exports = {
  firebaseConfig,
  adminConfig,
};
