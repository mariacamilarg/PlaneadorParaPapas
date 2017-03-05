// Modules
const bodyParser = require('body-parser');
const express = require('express');
var mongoose = require('mongoose');

const routes = require('./routes/index');

// Vars
let app = express();

app.use(bodyParser.json());

routes(app);


var listener = app.listen(process.env.PORT || 8888, function() {
    console.log('App running on http://localhost:' + listener.address().port);
});
// var listener = app.listen(8888, function(){
//     console.log('Listening on port ' + listener.address().port); //Listening on port 8888
// });