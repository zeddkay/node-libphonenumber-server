
// Load HTTP module
///var http = require("http");
var express = require('express')
var app = express();
var PNF = require('google-libphonenumber').PhoneNumberFormat;
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
var multer = require('multer');
var upload = multer({dest: 'uploads/'});



app.get('/api/phonenumbers/parse/text/:num', function(req, res){
    var msg = req.params.num;
    if (msg != "nothing" && msg != "") {
        //var arr = msg.split(',');
        //var arr = msg.split(/;|,/);
        var arr = msg.split(/[;,]/);
        res.status(200).json(parseNum(arr));
    } else {
        res.status(400).json([]);
    }    
});

app.get('/api/phonenumbers/parse/file/', async (req, res) => {
    res.sendFile(__dirname + "/upload.html");
});

app.post('/api/phonenumbers/parse/file', upload.single('upload'), function(req, res) {
    if (req.file) {
        console.log("File located!");
        var fs = require('fs');
       // var buf = fs.readFileSync(req.file.path);
       // var str = buf.toString('ascii');
       // var buff = new Buffer(str, 'base64').toString('ascii');
       var fileContents = fs.readFileSync(req.file.path);
       var buf = Buffer.from(fileContents, 'base64').toString('ascii'); 
       
       var str = buf.split('\n') + " ";
       // if (str != null && str != "") {
            var arr = str.split(/[;,]/);
       // } else {
          //  res.status(400).send("File turned out to be empty!");
        //}
        console.log("Array length is " + arr.length);
        res.status(200).json(parseNum(arr));
    } else {
        console.log("File not located!!!");
        res.status(400).send("No file was uploaded!");
    }


});




function parseNum(num) {
    var result = [];
    var number;
   // var numbers = phoneUtil.parse(text, "CA");

        console.log("inside Array length is " + num.length);
        for (var i = 0; i < num.length; i++) {


    try {

            number = phoneUtil.parse(num[i], 'CA');
            if (phoneUtil.isValidNumber(number)) {
                result.push(phoneUtil.format(number, PNF.NATIONAL));
            }
            
 }
    catch(err) {

    console.log("Exception for string: " + num[i] + " : " + err);
    }

        }
   
    return Array.from(new Set(result));
}



// Print URL for accessing server
console.log('Server running at http://127.0.0.1:8000/');



app.listen(8000);

module.exports = app;