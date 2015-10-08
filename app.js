var express = require('express');
var router = express.Router();

console.log('starting sap-bi-rest-client');

var app = express();

app.use('/', require('./routes'));

//serve the static content from /admin
app.use('/', express.static('site'));
// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Start the server
app.set('port', 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});