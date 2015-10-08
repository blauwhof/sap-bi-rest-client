var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
client = new Client();

var login = function(req, res, next) {
   console.log('username ' + req.query.username);
   console.log('password ' + req.query.password);
   console.log('username ' + req.query.uri);

      args ={
        headers:{"Content-Type": "application/xml"},
        data:"<attrs xmlns='http://www.sap.com/rws/bip'><attr name='userName' type='string'/>" + req.query.username + "</attr><attr name='password' type='string'>" + req.query.password + "</attr><attr name='auth' type='string' possibilities='secEnterprise,secLDAP,secWinAD,secSAPR3'>secEnterprise</attr></attrs>"
      };

   client.post(req.query.uri + "/logon/long", args, function(data, response){
               // parsed response body as js object
               console.log(data);
               // raw response
               console.log(response);
   });

}

router.get('/api', login);

module.exports = router;