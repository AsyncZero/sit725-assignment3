let userID;
let player1;
let player2;
let player3;
let player4;
let playerCount;
let playerarray = ["", "", "", ""];

//AddName() for Button
function AddName() {
  //gettting the values
  username = document.getElementById("PlayerName").value;
  //entering name validation present or not
  if (username == "") {
    alert("Please add your name!");
    document.getElementById("PlayerName").style.background = "red";
    document.getElementById("PlayerName").focus();
  }
  //check if only number enetered using regex
  else if (username.match(/^\d+$/)) {
    alert("Please add a valid name!");
    document.getElementById("PlayerName").focus();
  } else {
    //pass username to localStorage.content
    localStorage.content = username;
    //redirect to playerList.html
    window.location.href = "./playerList.html";
  }
}

const addComputerPlayer = () => {
  if (player2 == null) {
    player2 = "CPU John";
    playerCount++;
    $("#loginUser2").html(player2);
    $("#secondBlock").show();
    $("#play").show();
  } else if (player3 == null) {
    player3 = "CPU Nicole";
    playerCount++;
    $("#loginUser3").html(player3);
    $("#kick2").hide();
    $("#thirdBlock").show();
  } else {
    player4 = "CPU Jessica";
    playerCount++;
    $("#loginUser4").html(player4);
    $("#kick3").hide();
    $("#fourthBlock").show();
  }
  if (playerCount == 4) {
    $("#addCPUbtn").hide();
  }
  console.log(
    "Player 1: " +
      player1 +
      " Player 2: " +
      player2 +
      " Player 3: " +
      player3 +
      " Player 4: " +
      player4 +
      " Player Count: " +
      playerCount
  );
};

const kickComputerPlayer2 = () => {
  player2 = null;
  playerCount--;
  $("#loginUser2").html(player2);
  $("#secondBlock").hide();
  $("#play").hide();
  if (playerCount == 4) {
    $("#addCPUbtn").hide();
  } else {
    $("#addCPUbtn").show();
  }
  console.log(" Player Count: " + playerCount);
};

const kickComputerPlayer3 = () => {
  player3 = null;
  playerCount--;
  $("#loginUser3").html(player3);
  $("#thirdBlock").hide();
  $("#kick2").show();
  if (playerCount == 4) {
    $("#addCPUbtn").hide();
  } else {
    $("#addCPUbtn").show();
  }
  console.log(" Player Count: " + playerCount);
};

const kickComputerPlayer4 = () => {
  player4 = null;
  playerCount--;
  $("#loginUser4").html(player4);
  $("#fourthBlock").hide();
  $("#kick3").show();
  if (playerCount == 4) {
    $("#addCPUbtn").hide();
  } else {
    $("#addCPUbtn").show();
  }
  console.log(" Player Count: " + playerCount);
};

$(document).ready(function () {
  var url = window.location.href.replace(
    "playerList.html",
    "player?players=" + localStorage.content
  );
  player1 = localStorage.content;
  console.log(
    "Player 1: " +
      player1 +
      " Player 2: " +
      player2 +
      " Player 3: " +
      player3 +
      " Player 4: " +
      player4 +
      " Player Count: " +
      playerCount
  );
  $.get(url, function (req, res) {
    //$("#loginUser").html(localStorage.content);
    $("#loginUser").html(player1);
    // $('#loginUser2').html(localStorage.content);
    // $('#loginUser3').html(localStorage.content);
    // $('#loginUser4').html(localStorage.content);
    if ($("#loginUser").text() == "") {
      $("#firstBlock").hide();
    }
    if ($("#loginUser").text() != "") {
      playerCount = 1;
    }
    if ($("#loginUser2").text() == "") {
      $("#secondBlock").hide();
    }
    if ($("#loginUser3").text() == "") {
      $("#thirdBlock").hide();
    }
    if ($("#loginUser4").text() == "") {
      $("#fourthBlock").hide();
    }
    if (playerCount == 4) {
      $("#addCPUbtn").hide();
    }
    if (playerCount == 1) {
      $("#play").hide();
    }
  });
});

let NameList = null;

const Play = () => {
  firstName = $("#loginUser").text();
  if (firstName != "") {
    let playerarray = [player1, player2, player3, player4];
    sessionStorage.setItem("playerCount", playerCount);
    sessionStorage.setItem("playerarray", JSON.stringify(playerarray));
    window.location.href = "./GameHome.html";
  } else {
    window.location.href = "./AddingPlayer.html";
  }
};

const leave = () => {
  localStorage.clear();
  window.location.href = "./HomePage.html";
};
