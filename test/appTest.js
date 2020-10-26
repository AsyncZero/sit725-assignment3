const expect = require('chai').expect;
const request = require('request');
const http = require('http');

describe("GET player Endpoint", function() {
    var logtime = new Date();
    var url = "http://localhost:3000/player?players=AppUnitTest&" + logtime;
    var url2 = "http://localhost:3000/playerLists";
    it('should return player added', function(done) {
        request(url, function(err, res, body) {
            expect(body).to.deep.equal("player added")
            done();
        })
    });
    it('should show that recent player added is AppUnitTest', function(done) {
        request(url2, function(err, res, body) {
            body = JSON.parse(body);
            var lastIndex = Object.keys(body).length -1;
            let result = "AppUnitTest"
            expect(body[lastIndex].players).to.deep.equal(result);
            done();
        })
    })
});