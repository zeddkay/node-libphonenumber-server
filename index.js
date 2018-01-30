
// Load HTTP module
///var http = require("http");
var express = require('express')
var app = express();
var PNF = require('google-libphonenumber').PhoneNumberFormat;
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
//var phoneNumber = phoneUtil.parse('202-456-1414', 'US');
//console.log(phoneUtil.format(phoneNumber, PNF.INTERNATIONAL));
app.get('/api/phonenumber/parse/:num', function(req, res){
    var msg = req.param('num');
    var phoneNumber = phoneUtil.parse(msg, 'CA');
    if (phoneUtil.isValidNumber(phoneNumber) == false) {
        console.log("Invalid number supplied");
        res.send("not a number");
    } else {
        console.log(phoneUtil.format(phoneNumber, PNF.CANADA));
        res.send(phoneUtil.format(phoneNumber, PNF.CA));
    }
    
});
app.listen(8000);

// Print URL for accessing server
console.log('Server running at http://127.0.0.1:8000/');



