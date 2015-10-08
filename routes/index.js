var express = require('express');
var router = express.Router();

var postFunction = function(req, res, next) {
   console.log('hoi ' + req.body);
}

router.post('/api', postFunction);

module.exports = router;