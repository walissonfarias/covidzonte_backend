const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const app = express();

app.set('PORT', process.env.PORT || 3000);
app.use(cors());
app.use(express.json());

/* role do token
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
*/
app.use(routes);

app.listen(app.get('PORT'));
//app.listen(3333);