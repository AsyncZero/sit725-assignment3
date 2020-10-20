//start game
$('#startbtn').on('click', function () {
	$('#startbtn').hide();
	$('#deck-container').show();
	$('.hand').empty();
	$('#deck-discards').empty();
	$('#deck').removeClass('empty-deck').addClass('card-back');
	deck = RandomizeDeck(buildDeck());
	//giving cards to player
	distributecards();
	//discarding cards
	discardedcards();

	/////////////////////////////////////////////////////////////////
	//this section is for demo purpose pleease delete this section//
	enemyCard = randomCard();
	console.log("This Enemy is created for testing purposes all the opponents players will be created after room joining. ");
	console.log('Enemy has '+enemyCard.name+' Card');
	////////////////////////////////////////////////////////////////
	updatedeck();

});

// Creating cards
let cards = {
	1: {
		id: 1,
		name: 'Guard',
		image: '../img/guard.PNG'
	},
	2: {
		id: 2,
		name: 'Priest',
		image: '../img/priest.PNG'
	},
	3: {
		id: 3,
		name: 'Baron',
		image: '../img/baron.PNG'
	},
	4: {
		id: 4,
		name: 'Handmaid',
		image: '../img/handmaid.PNG'
	},
	5: {
		id: 5,
		name: 'Prince',
		image: '../img/prince.PNG'
	},
	6: {
		id: 6,
		name: 'King',
		image: '../img/king.PNG'
	},
	7: {
		id: 7,
		name: 'Countess',
		image: '../img/countess.PNG'
	},
	8: {
		id: 8,
		name: 'Princess',
		image: '../img/princess.PNG'
	}
};
//player hands
let playerHands = [];
//player protection after using handmaid card
let playerprotection = false;
//building cardsdeck
let buildDeck = function () {
	let Carddeck = [];
	//adding 5 guard cards
	for (i = 0; i < 5; i++) {
		Carddeck.push(cards[1])
	}
	//adding 2 prince,baron,handmaid,prince cards
	for (i = 0; i < 2; i++) {
		Carddeck.push(cards[2]);
		Carddeck.push(cards[3]);
		Carddeck.push(cards[4]);
		Carddeck.push(cards[5]);
	}
	//adding 1 King,countess,princess card
	Carddeck.push(cards[6]);
	Carddeck.push(cards[7]);
	Carddeck.push(cards[8]);
	return Carddeck;
};
//randomize the deck
function RandomizeDeck(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
//get random card from Deck
function randomCard() {

	card_index = Math.floor(Math.random() * deck.length);
	card = deck[card_index];

	deck.splice(card_index, 1);
	return card;
}
//show rules card
$('#rules').hover(function () {
	$('#show-card').css('background-image', "url(../img/rules.png)").show()
}, function () {
	$('#show-card').hide();
});
//adding card to player hand
var addCard = function (Cardclass, card) {
	if (Cardclass.includes('#discarded-cards')) {
		$(Cardclass).append('<div cardRole="' + card.id + '" class="card card-mini" "></div>');
	} else {
		$(Cardclass).append('<div cardRole="' + card.id + '" class="card card-mini" onclick="playcard(this)"></div>');
	}

	$(Cardclass + ' div:last-child').hover(function () {
		$('#show-card').css('background-image', "url(" + card.image + ")").show()
	}, function () {
		$('#show-card').hide();
	}).css('background-image', "url(" + card.image + ")");


};
//function to handle played card
function playcard(Userplayed) {

	usercard = $(Userplayed).attr("cardrole");
	if (usercard === '8') {
		alert("You Are elimminated Because You Played Princess Card.");
		window.location.href = "/";
	} else {
		if (CardActions(usercard)) {
			alert("you win");
			window.location.href = "/";
		}
		$(Userplayed).remove();

	}


}
//function to distribute cards to players
function distributecards() {
	playerHands = [randomCard(), randomCard()];
	addCard('#you .hand', playerHands[0]);
	addCard('#you .hand', playerHands[1]);
}
//function to add discarded cards
function discardedcards() {
	addCard('#discarded-cards', randomCard());
	addCard('#discarded-cards', randomCard());
	addCard('#discarded-cards', randomCard());
}

function updatedeck() {
	let remaining_card = 3 + deck.length;
	$('#deck').css({
		'border-top-left-radius': remaining_card,
		'border-bottom-right-radius': remaining_card,
		'border-top-width': 3,
		'border-left-width': remaining_card,
		'border-bottom-width': remaining_card,
		'border-right-width': 3,
	}).html('<h1 style="color:white;">' + deck.length + '</h1>');
}
//function to update hands of player
function updatehands() {
	playerHands[1] = randomCard();
	addCard('#you .hand', playerHands[1]);
}
// Card Actions
function CardActions(card_id) {
	var enemycardif = enemyCard.id;
	var winstate = false;
	switch (card_id) {
		case '1':
			//played guard card
			console.log("You Played Guard Card.");
			guess_target = prompt("Enter Your target Card:\n1.Guard.\n2.Priest.\n3.Baron.\n4.Handmaid.\n5.Prince.\n6.King.\n7.Countess.\n8.Princess.");
			if (Number(guess_target) === enemycardif) {
				winstate = true;
			}
      else{
				console.log("Your target does not succed.");
        updatehands();
        updatedeck();
      }
			break;
		case '2':
			//played preist card
			console.log("You Played preist Card.");
			alert("Enemy Has " + enemyCard.name + " Card in his Hand");
      updatehands();
      updatedeck();
			break;
		case '3':
			//baron card
			console.log("You Played baron Card.");
			guess_target = prompt("Choose your card to compare:\n1.Guard.\n2.Priest.\n3.Baron.\n4.Handmaid.\n5.Prince.\n6.King.\n7.Countess.\n8.Princess.");
			if (Number(guess_target) > enemycardif) {
				winstate = true;
			}
      else{
				console.log("player has greatest card than you entered.");
        updatehands();
        updatedeck();
      }
			break;
		case '4':

			//handmaid card event
			console.log("You Played handmaid Card.");
			playerprotection = true;
			console.log("HandMaid is protecting you from next Attack");
      updatehands();
      updatedeck();
			break;
		case '5':
			//prince card
			///please change this with target enemy of room
			console.log("You Played prince Card.");
			enemyCard = randomCard();
      updatehands();
      updatedeck();
			console.log("Enemy's card is discarded and he has drawn a new card from deck: "+enemyCard.name);
			break;
		case '6':
			//king card
			console.log("You Played king Card.");
			if (playerHands[0].name == "King") {
				_tempplayercard = playerHands[1];
				playerHands[1] = enemyCard;
				enemyCard = _tempplayercard;
			} else {
				_tempplayercard = playerHands[0];
				playerHands[0] = enemyCard;
				enemyCard = _tempplayercard;
			}
			console.log("You have traded your card with enemy.");
			updatehands();
      updatedeck();
			break;

	case '7':
	//countess card
	console.log("You Played countess Card.");
	updatehands();
	updatedeck();
	break;
	}
	return winstate;


}
