
// Load HTTP module
///var http = require("http");
var express = require('express')
var app = express();
var PNF = require('google-libphonenumber').PhoneNumberFormat;
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

app.get('/api/phonenumber/parse/text/:num', function(req, res){
    var msg = req.params.num;
    if (msg != "nothing" && msg != "") {
        //var arr = msg.split(',');
        //var arr = msg.split(/;|,/);
        var arr = msg.split(/[;,]/);
        res.status(200).json(parseNum(arr));
    } else {
        res.status(400).json([]);
    }
    
    /*
    var phoneNumber = phoneUtil.parse(msg, 'CA');
    if (phoneUtil.isValidNumber(phoneNumber) == false) {
        console.log("Invalid number supplied");
      //  res.send("not a number");
    } else  if (phoneUtil.isValidNumber(phoneNumber) == true) {
        console.log(phoneUtil.format(phoneNumber, PNF.CANADA));
       // res.send(phoneUtil.format(phoneNumber, PNF.CA));
    }
    */
  //  let result = parseNum(req.params.num);
  //  res.status(200).json(result);
    
});

//app.post



function parseNum(num) {
    var result = [];
    var number;
   // var numbers = phoneUtil.parse(text, "CA");

    try {
        for (var i = 0; i < num.length; i++) {
            number = phoneUtil.parse(num[i], 'CA');
            if (phoneUtil.isValidNumber(number)) {
                result.push(phoneUtil.format(number, PNF.NATIONAL));
            }
            
        }
    }
    catch(err) {

        console.log("Exception for string: " + num[i] + " : " + err);
    }
    return Array.from(new Set(result));
}



// Print URL for accessing server
console.log('Server running at http://127.0.0.1:8000/');



app.listen(8000);

module.exports = app;