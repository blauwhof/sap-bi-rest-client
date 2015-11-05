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
        data:"<attrs xmlns='http://www.sap.com/rws/bip'><attr name='userName' type='string'>" + req.query.username + "</attr><attr name='password' type='string'>" + req.query.password + "</attr><attr name='auth' type='string' possibilities='secEnterprise,secLDAP,secWinAD,secSAPR3'>secEnterprise</attr></attrs>"
        //"<attrs xmlns='http://www.sap.com/rws/bip'><attr name='userName' type='string'>MIVU</attr><attr name='password' type='string'>pwizmw1</attr><attr name='auth' type='string' possibilities='secEnterprise,secLDAP,secWinAD,secSAPR3'>secEnterprise</attr></attrs>"
      };

   client.post(req.query.uri + "/logon/long", args, function(data, response){
               // parsed response body as js object
              //console.log(data);
               // raw response
               console.log(response.body);
               //console.log(response.headers['x-sap-logontoken']);
               res.header("Access-Control-Allow-Origin", "*");
               res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
               res.json({'xSapLogonToken' : response.headers['x-sap-logontoken']});
   });

}

var proxy = function(req, res, next) {
   console.log('header: ' + req.headers['x-sap-logontoken']);
   console.log(req.url);
   var vuUrl = req.url.split("/proxy/")[1];
   console.log(vuUrl);
   //
   args ={
        headers:{"Content-Type": "application/xml",
        "X-SAP-LogonToken":req.headers['x-sap-logontoken']
    }
  };


   client.get(vuUrl, args, function(data, response){
               // parsed response body as js object
              //console.log(data);
               // raw response
             console.log('data: ' + data);
               //console.log(response.headers['x-sap-logontoken']);
               res.header("Access-Control-Allow-Origin", "*");
               res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
               res.send(data);
   });
}

router.get('/api', login);

router.get('/proxy*', proxy);

module.exports = router;