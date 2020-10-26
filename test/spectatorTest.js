const expect = require('chai').expect;
const spectator = require('../public/spectator');
var input;
var result;
//test validateSpectator()
describe('ValidateSpectatorName', function() {
    it('should return a Name', function() {
        input = 'SpectatorUnitTest';
        result = input
        expect(spectator.validateSpectator(input)).to.equal(result);
    });
    it('should not accept empty input', function() {
        input = '';
        result = false;
        expect(spectator.validateSpectator(input)).to.equal(result);
    });
    it('should not accept numbers only', function() {
        input = '400';
        result = false;
        expect(spectator.validateSpectator(input)).to.equal(result);
    });
    it('should not accept null input', function() {
        input = null;
        result = false;
        expect(spectator.validateSpectator(input)).to.equal(result);
    });
});

//test addSpectator
describe('AddSpectator', function() {
    it('should return a spectator Object if input is valid', function() {
        input = 'SpectatorUnitTest'
        result = {
            username: input,
            role: 'spectator'
        }
        expect(spectator.addSpectator(input)).to.deep.equal(result)
    })
    
    it('should return error message if input is empty', function() {
        input = '';
        result = "You have enterd an invalid name";
        expect(spectator.addSpectator(input)).to.equal(result);
    });
    it('should return error message if input is a number', function() {
        input = '400';
        result = "You have enterd an invalid name";
        expect(spectator.addSpectator(input)).to.equal(result);
    });
    it('should return error message if input is null', function() {
        input = null;
        result = "You have enterd an invalid name";
        expect(spectator.addSpectator(input)).to.equal(result);
    });
});

//test addToSpectatorList
describe('AddToSpectatorList', function() {
    it('should return a list of spectators', function() {
        input = {
            username: 'SpectatorListUnitTest',
            role: 'spectator'
        }
        result =  [{
            username: 'SpectatorListUnitTest',
            role: 'spectator'
        }]
        expect(spectator.addToSpectatorList(input)).to.deep.equal(result);
    });
});