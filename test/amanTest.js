const expect = require('chai').expect;
const jsdom = require('jsdom');
global.$ = require('jquery')(new jsdom.JSDOM().window);
global.document = jsdom;
const aman = require('../public/aman');

describe('BuildDeck',function() {
    it('should create a deck of 16 cards', function(){
        let result = 16;
        expect(aman.buildDeck().length).to.deep.equal(result);
    });
    it('should have 5 guard cards', function() {
        let result = 5;
        var deck = aman.buildDeck();
        var guardCount = 0;
        for (i = 0; i < deck.length; i++) {
            if (deck[i].name === "Guard") {guardCount++}
        }
        expect(guardCount).to.equal(result);
    });
    it('should have 2 Priest cards', function() {
        let result = 2;
        var deck = aman.buildDeck();
        var priestCount = 0;
        for (i = 0; i < deck.length; i++) {
            if (deck[i].name === "Priest") {priestCount++}
        }
        expect(priestCount).to.equal(result);
    });
    it('should have 2 Prince cards', function() {
        let result = 2;
        var deck = aman.buildDeck();
        var princeCount = 0;
        for (i = 0; i < deck.length; i++) {
            if (deck[i].name === "Prince") {princeCount++}
        }
        expect(princeCount).to.equal(result);
    });
    it('should have 2 Baron cards', function() {
        let result = 2;
        var deck = aman.buildDeck();
        var baronCount = 0;
        for (i = 0; i < deck.length; i++) {
            if (deck[i].name === "Baron") {baronCount++}
        }
        expect(baronCount).to.equal(result);
    });
    it('should have 2 Handmaid cards', function() {
        let result = 2;
        var deck = aman.buildDeck();
        var handmaidCount = 0;
        for (i = 0; i < deck.length; i++) {
            if (deck[i].name === "Handmaid") {handmaidCount++}
        }
        expect(handmaidCount).to.equal(result);
    });
    it('should have 1 King card', function() {
        let result = 1;
        var deck = aman.buildDeck();
        var kingCount = 0;
        for (i = 0; i < deck.length; i++) {
            if (deck[i].name === "King") {kingCount++}
        }
        expect(kingCount).to.equal(result);
    });
    it('should have 1 Countess card', function() {
        let result = 1;
        var deck = aman.buildDeck();
        var countessCount = 0;
        for (i = 0; i < deck.length; i++) {
            if (deck[i].name === "Countess") {countessCount++}
        }
        expect(countessCount).to.equal(result);
    });
    it('should have 1 Princess card', function() {
        let result = 1;
        var deck = aman.buildDeck();
        var princessCount = 0;
        for (i = 0; i < deck.length; i++) {
            if (deck[i].name === "Princess") {princessCount++}
        }
        expect(princessCount).to.equal(result);
    });
})