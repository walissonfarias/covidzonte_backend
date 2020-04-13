const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const app = express();


app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

/* role do token
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
*/
app.use(routes);


app.listen(3333);