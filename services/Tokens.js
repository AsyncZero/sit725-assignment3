let userID, tokenCount, playerCount = 0;
let scoreBoard = [];

function giveToken(winnerID) {
  for (var x = 0; x < playerCount; x++) {
    if (scoreBoard[x].userID == winnerID) {
      scoreBoard[x].tokenCount += 1;
      return scoreBoard[x];
    }
    if (x == playerCount -1 && scoreBoard[x].userID != winnerID){
      return "Player not found";
    }
  }
}

function addPlayer(userID) {
  let player = {
    userID: userID,
    tokenCount: 0
  }
  if (userID == "")
  {
    return "No userID found";
  } else {
    scoreBoard.push(player);
    playerCount += 1;
    return player;    
  }
}

module.exports = {
  addPlayer,
  giveToken
}