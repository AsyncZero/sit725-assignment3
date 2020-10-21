<<<<<<< HEAD
let userID, tokenCount, playerCount;
let scoreBoard = [];

function giveToken(winnerID) {
  for (var x = 0; x < playerCount; x++) {
    if (scoreBoard[x].userID == winnerID) {
      scoreBoard[x].tokenCount += 1;
    }
  }
}

function addPlayer(userID) {
  let player = {
    userID: userID,
    tokenCount: 0,
  };
  scoreBoard.push(player);
}
=======
let userID, tokenCount, playerCount;
let scoreBoard = [];

function giveToken(winnerID) {
  for (var x = 0; x < playerCount; x++) {
    if (scoreBoard[x].userID == winnerID) {
      scoreBoard[x].tokenCount += 1;
    }
  }
}

function addPlayer(userID) {
  let player = {
    userID: userID,
    tokenCount: 0,
  };
  scoreBoard.push(player);
}
>>>>>>> master
