let playerArray;
let playerCount;
let activePlayer = 1;

$(document).ready(function () {
  deck = RandomizeDeck(buildDeck());
  //let playerCount = sessionStorage.getItem("playerCount");
  let playerCount = getPlayerCount();
  let playerArray = JSON.parse(sessionStorage.getItem("playerarray"));
  console.log(playerCount);
  console.log(playerArray);
  $("#firstPlayer").html(playerArray[0]);
  $("#secondPlayer").html(playerArray[1]);
  $(".Box1").show();
  $(".Box2").show();
  $(".Box3").hide();
  $(".Box4").hide();
  playerHands = [randomCard()];
  playerHands2 = [randomCard()];
  if (playerCount == 3) {
    $("#thirdPlayer").html(playerArray[2]);
    $(".Box3").show();
    playerHands3 = [randomCard()];
  }
  if (playerCount == 4) {
    $("#thirdPlayer").html(playerArray[2]);
    $("#fourthPlayer").html(playerArray[3]);
    $(".Box3").show();
    $(".Box4").show();
    playerHands3 = [randomCard()];
    playerHands4 = [randomCard()];
  }
  //enemyhands = [randomCard()];
  //giving cards to player
  distributecards(playerCount);
  console.log(playerHands);
  console.log(playerHands2);
  console.log(playerHands3);
  console.log(playerHands4);
  //discarding cards
  discardedcards();
  ////////////////////////////////////////////////////////////////
  //this section is for demo purpose pleease delete this section//
  /*
  enemyCard = enemyhands[0];
  console.log(
    "This Enemy is created for testing purposes all the opponents players will be created after room joining. "
  );
  console.log("Enemy has " + enemyCard.name + " Card");
  */
  ////////////////////////////////////////////////////////////////
  updatedeck();
});

// Creating cards
let cards = {
  1: {
    id: 1,
    name: "Guard",
    image: "../IMAGES/Guard.png",
  },
  2: {
    id: 2,
    name: "Priest",
    image: "../IMAGES/Priest.png",
  },
  3: {
    id: 3,
    name: "Baron",
    image: "../IMAGES/Baron.png",
  },
  4: {
    id: 4,
    name: "Handmaid",
    image: "../IMAGES/Handmaid.png",
  },
  5: {
    id: 5,
    name: "Prince",
    image: "../IMAGES/Prince.png",
  },
  6: {
    id: 6,
    name: "King",
    image: "../IMAGES/King.png",
  },
  7: {
    id: 7,
    name: "Countess",
    image: "../IMAGES/countess.png",
  },
  8: {
    id: 8,
    name: "Princess",
    image: "../IMAGES/princess.png",
  },
};
//player hands
let playerHands = [];
let playerHands2 = [];
let playerHands3 = [];
let playerHands4 = [];
//player protection after using handmaid card
let playerprotection = false;
//building cardsdeck
let buildDeck = function () {
  let Carddeck = [];
  //adding 5 guard cards
  for (i = 0; i < 5; i++) {
    Carddeck.push(cards[1]);
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
//adding card to player hand
var addCard = function (Cardclass, card) {
  if (Cardclass.includes(".enemy")) {
    $(Cardclass).append(
      '<div cardRole="' + card.id + '" class="card " "></div>'
    );
  } else {
    $(Cardclass).append(
      '<div cardRole="' +
        card.id +
        '" class="card " onclick="playcard(this)"></div>'
    );
  }

  $(Cardclass + " div:last-child")
    .hover(
      function () {
        $("#show-card")
          .css("background-image", "url(" + card.image + ")")
          .show();
      },
      function () {
        $("#show-card").hide();
      }
    )
    .css("background-image", "url(" + card.image + ")");
};

//function to handle played card
function playcard(Userplayed) {
  displayText();
  if (deck.length > 0) {
    usercard = $(Userplayed).attr("cardrole");
    if (usercard === "8") {
      alert("You Are elimminated Because You Played Princess Card.");
      window.location.href = "/game";
    } else {
      if (!playerprotection) {
        if (CardActions(usercard)) {
          alert("you win");
          window.location.href = "/game";
        }
      } else {
        console.log("Safe Due to protection event");
        playerprotection = false;
        updatehands();
        updatedeck();
      }
      $(Userplayed).remove();
    }
  } else {
    alert("Deck is empty/");
    window.location.href = "/game";
  }
}
//function to distribute cards to players
function distributecards(numofPlayers) {
  console.log(numofPlayers);
  addCard(".Box1 #box1 #first .hand", playerHands[0]);
  addCard(".Box2 #box2 #second .hand", playerHands2[0]);
  if (numofPlayers == 3) {
    addCard(".Box3 #box3 #third .hand", playerHands3[0]);
  }
  if (numofPlayers == 4) {
    addCard(".Box3 #box3 #third .hand", playerHands3[0]);
    addCard(".Box4 #box4 #fourth .hand", playerHands4[0]);
  }
  console.log(playerHands);
  console.log(playerHands2);
  console.log(playerHands3);
  console.log(playerHands4);
}
//function to add discarded cards
function discardedcards() {
  addCard("#discarded-cards", randomCard());
  addCard("#discarded-cards", randomCard());
  addCard("#discarded-cards", randomCard());
}

function updatedeck() {
  let remaining_card = 3 + deck.length;
  $("#deck")
    .css({
      "border-top-left-radius": remaining_card,
      "border-bottom-right-radius": remaining_card,
      "border-right-width": 3,
      "border-top-width": 3,
      "border-left-width": remaining_card,
      "border-bottom-width": remaining_card,
    })
    .html('<h1 style="color:white;">' + deck.length + " Cards Left</h1>");
}

//function to update hands of player
function updatehands() {
  playerHands[1] = randomCard();
  addCard(".Box1 #box1 #first .hand", playerHands[1]);
}

//gameHome Text box
var boxText = "";
function displayText() {
  document.getElementById("abc").innerHTML = boxText;
}
function updateDisplayText(text1) {
  boxText += "<br/>" + text1;
  console.log(text1);
}
// Card Actions
function CardActions(card_id) {
  let playerCount = getPlayerCount();
  console.log(playerCount);
  displayText();
  //var enemycardif = enemyCard.id;
  var winstate = false;
  switch (card_id) {
    case "1":
      //played guard card
      updateDisplayText("You Played Guard Card.");
      guess_target = prompt(
        "Enter Your target Card:\n1.Guard.\n2.Priest.\n3.Baron.\n4.Handmaid.\n5.Prince.\n6.King.\n7.Countess.\n8.Princess."
      );
      player_target = prompt("Enter Your target player:1,2,3,4");
      if (Number(player_target > playerCount)) {
        updateDisplayText("Pick a valid player number");
      } else if (Number(guess_target) === enemycardif) {
        winstate = true;
      } else {
        updateDisplayText("Your target does not succeed.");
        updatehands();
        updatedeck();
      }
      break;
    case "2":
      //played preist card
      updateDisplayText("You Played preist Card.");

      alert("Enemy Has " + enemyCard.name + " Card in his Hand");
      updatehands();
      updatedeck();
      break;
    case "3":
      //baron card
      updateDisplayText("You Played baron Card.");
      guess_target = prompt(
        "Choose your card to compare:\n1.Guard.\n2.Priest.\n3.Baron.\n4.Handmaid.\n5.Prince.\n6.King.\n7.Countess.\n8.Princess."
      );
      if (Number(guess_target) > enemycardif) {
        winstate = true;
      } else {
        updateDisplayText("player has greatest card than you entered.");
        updatehands();
        updatedeck();
      }
      break;
    case "4":
      //handmaid card event
      updateDisplayText("You Played handmaid Card.");
      playerprotection = true;
      alert("HandMaid is protecting you from next Attack");
      updateDisplayText("HandMaid is protecting you from next Attack");
      updatehands();
      updatedeck();
      break;
    case "5":
      //prince card
      ///please change this with target enemy of room
      updateDisplayText("You Played prince Card.");
      enemyCard = randomCard();
      updatehands();
      updatedeck();
      updateDisplayText(
        "Enemy's card is discarded and he has drawn a new card from deck: " +
          enemyCard.name
      );
      break;
    case "6":
      //king card
      updateDisplayText("You Played king Card.");
      if (playerHands[0].name == "King") {
        _tempplayercard = playerHands[1];
        playerHands[1] = enemyCard;
        enemyCard = _tempplayercard;
      } else {
        _tempplayercard = playerHands[0];
        playerHands[0] = enemyCard;
        enemyCard = _tempplayercard;
      }
      updateDisplayText("You have traded your card with enemy.");
      updatehands();
      updatedeck();
      break;

    case "7":
      //countess card
      updateDisplayText("You Played countess Card.");
      updatehands();
      updatedeck();
      break;
  }
  displayText();
  return winstate;
}

let turnOrder = () => {
  if (activePlayer == 1) {
  }
};

const leave = () => {
  localStorage.clear();
  window.location.href = "./HomePage.html";
};

const getPlayerCount = () => {
  let playerCount = sessionStorage.getItem("playerCount");
  return playerCount;
};

//exports for testing
module.exports = {
  buildDeck,
  RandomizeDeck,
  randomCard,
  CardActions,
};
