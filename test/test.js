//Release 0.1
//Zukhruf Khan

var chai = require('chai');
chai.use(require('chai-http'));
var server = require('../index.js');
let should = chai.should();
var fs = require('fs');

//Test /GET root request
describe('Test that local host root is active using /', () => {
    it("should return a status of 200", (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});


//Test first /GET text snippet parse
describe('Parse first snippet of text using /parse/text/string', () => {
    it("should return a one number list: ['(416) 491-5050']", (done) => {
        chai.request(server)
            .get('/api/phonenumbers/parse/text/Seneca%20Phone%20Number%3A%20416-491-5050 ')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array').that.include("(416) 491-5050");
                done();
            });
    });
});


//Test second /GET text snippet parse
describe('Parse second snippet of text using /parse/text/string', () => {
    it("should return a one number list: ['(647) 890-2134']", (done) => {
        chai.request(server)
            .get('/api/phonenumbers/parse/text/lalala 905-3453344ee')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array').that.include("(905) 345-3344");
                done();
            });
    });
});


//Test third /GET text snippet parse
describe('Parse third snippet of text using /parse/text/string', () => {
    it("should return an empty list: [ ]", (done) => {
        chai.request(server)
            .get('/api/phonenumbers/parse/text/nothing')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.an('array').that = null;
                done();
            });
    });
});


//Test /POST first text file parse with numbers.txt
describe('Parse first text file using /parse/file/', () => {
    it("should return a 3 number list: ['(647) 345-5678','(906) 543-3333','(416) 234-5678'", (done) => {
        chai.request(server)
            .post('/api/phonenumbers/parse/file')
            .set('Content-Type', 'text/plain')
            .attach('upload', fs.readFileSync(__dirname + '/../numbers.txt'), 'numbers.txt')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array').that.include("(647) 345-5678","(906) 543-3333","(416) 234-5678");
                done();
            });
    });
});


//Test /POST second text file parse with numbers2.txt
describe('Parse second text file using /parse/file/', () => {
    it("should return a 5 number list: ['(989) 999-0909','(905) 612-8888','(647) 484-5959','(905) 645-5555','(647) 647-6474'", (done) => {
        chai.request(server)
            .post('/api/phonenumbers/parse/file')
            .set('Content-Type', 'text/plain')
            .attach('upload', fs.readFileSync(__dirname + '/../numbers2.txt'), 'numbers2.txt')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array').that.include("(989) 999-0909","(905) 612-8888","(647) 484-5959","(905) 645-5555","(647) 647-6474");
                done();
            });
    });
});
