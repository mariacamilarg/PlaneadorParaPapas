// Modules
const bodyParser = require('body-parser');
const express = require('express');
var mongoose = require('mongoose');

const routes = require('./routes/index');

// Vars
let app = express();

app.use(bodyParser.json());

routes(app);


app.listen(process.env.PORT || 8080, function() {
    console.log('App running on http://localhost:' + port);
});
