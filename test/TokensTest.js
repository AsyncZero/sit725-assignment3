const expect = require('chai').expect;
const tokens = require('../services/Tokens');

describe('AddPlayer', function() {
    it('should return an object with data { userID: \'Nico\', tokenCount:0 }', function() {
        let result = {
            userID: 'Nico',
            tokenCount: 0
        }
        expect(tokens.addPlayer('Nico')).to.deep.equal(result);
    });
    it('should return No userID found', function () {
        let result = "No userID found";
        expect(tokens.addPlayer('')).to.equal(result);
    });
});

describe('GiveToken', function() {
    tokens.addPlayer('Lara');
    it('should return an object with data { userid: \'Lara\', tokenCount: 1 }', function() {
        let result = {
            userID: 'Lara',
            tokenCount: 1
        }
        expect(tokens.giveToken('Lara')).to.deep.equal(result);
    });
    it('should return Player not found', function() {
        let result = "Player not found";
        expect(tokens.giveToken('Ion')).to.equal(result);
    });
})