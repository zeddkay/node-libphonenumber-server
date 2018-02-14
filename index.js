//Release 0.1
//Zukhruf Khan

var express = require('express')
var app = express();
var PNF = require('google-libphonenumber').PhoneNumberFormat;
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var WordExtractor = require("word-extractor");

var extractor = new WordExtractor();

app.get('', function(req, res){
    res.status(200).send("Server is running.");
});

app.get('/api/phonenumbers/parse/text/:num', function(req, res){
    var msg = req.params.num;
    if (msg != "nothing" && msg != "") {
        var arr = msg.split(/[;,]/);
        res.status(200).json(parseNum(arr));
    } else {
        res.status(400).json([]);
    }    
});

app.get('/api/phonenumbers/parse/file/', async (req, res) => {
    res.sendFile(__dirname + "/upload.html");
});
app.get('/api/phonenumbers/parse/word/', async (req, res) => {
    res.sendFile(__dirname + "/uploadWord.html");
});

app.post('/api/phonenumbers/parse/file', upload.single('upload'), function(req, res) {
    if (req.file) {
        console.log("File located!");
        var fs = require('fs');
        var fileContents = fs.readFileSync(req.file.path);
        var buf = Buffer.from(fileContents, 'base64').toString(); 
        var str = buf.split("\n") + "";
        var arr = str.split(/[;,]/);
        res.status(200).json(parseNum(arr));
    } else {
        console.log("File not located!!!");
        res.status(400).send("No file was uploaded!");
    }

});

app.post('/api/phonenumbers/parse/word', upload.single('upload'), function(req, res) {
    if (req.file) {
        console.log("File located!");
        var fileContents;
        var mDoc = req.file.originalname;
        var extracted = extractor.extract(mDoc);

        extracted.then(function(doc) {
            fileContents = doc.getBody();
            var str = fileContents.split("\n") + "";
            var arr = str.split(/[;,]/);
            res.status(200).json(parseNum(arr));
        });
    } else {
        console.log("File not located!!!");
        res.status(400).send("No file was uploaded!");
    }

});


function parseNum(num) {
    var result = [];
    var number;
    for (var i = 0; i < num.length; i++) {
        try {
            var temp = num[i].replace(/\D/g, '');   //parse any non-numeric characters
            number = phoneUtil.parseAndKeepRawInput(temp, 'CA');
            
            if (phoneUtil.isValidNumber(number)) {
                
                result.push(phoneUtil.format(number, PNF.NATIONAL));
               
            }
        }
        catch(err) {
        }
    }
    return Array.from(new Set(result));
}

//Print URL for accessing server
console.log('Server running at http://127.0.0.1:8000/');

app.listen(8000);

module.exports = app;