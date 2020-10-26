let userID;
let player1;
let player2;
let player3;
let player4;
let playerCount;

//addingName method
const AddName = () => {
  let Name = $("#PlayerName").val();
  localStorage.content = $("#PlayerName").val();
  //gettting the values
  var name = document.getElementById("PlayerName").value;
  //entering name validation present or not
  if (Name.length == "") {
    alert("Please add your name!");
    if (confirm("Please add your name!") == true) {
      document.getElementById("PlayerName").style.background = "red";
      $("#PlayerName").focus();
    } else {
      document.getElementById("PlayerName").style.background = "green";
      $("#PlayerName").focus();
    }
  }
  //check if only number enetered using regex
  else if (Name.match(/^\d+$/)) {
    alert("Please add a valid name!");
    Name.focus();
  } else {
    userID = name;

    // window.location.href = "./playerList.html?Name=" + Name;
    window.location.href = "./playerList.html";
  }
};

const addComputerPlayer = () => {
  if (player2 == null) {
    player2 = "CPU John";
    playerCount++;
  } else if (player3 == null) {
    player3 = "CPU Nicole";
    playerCount++;
  } else {
    player4 = "CPU Jessica";
    playerCount++;
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

$(document).ready(function () {
  var url = window.location.href.replace(
    "playerList.html",
    "player?players=" + localStorage.content
  );
  player1 = localStorage.content;
  console.log(
    "PLayer 1: " +
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
    $("#loginUser").html(localStorage.content);
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
  });
});

// window.onload = function() {
//     var url = window.location.href.split('=');
//     var name = url[1];
//     var names = url[1];
//     $('#loginUser').html(name);
//     $('#firstPlayer').html(name);
// }

let NameList = null;

const Play = () => {
  firstName = $("#loginUser").text();
  if (firstName != "") {
    //     if ($('#loginUser').text() != "" && $('#loginUser2').text() != "") {
    window.location.href = "./GameHome.html";
    //         $(document).ready(function() {
    //             document.getElementsByClassName('Box1').style.display = 'none';
    //             // $('.Box1').hide();
    //             $('.Box2').hide();
    //             $('.Box3').hide();
    //             $('.Box4').hide();
    //         });
    //     } else if ($('#loginUser1').text() != "" && $('#loginUser2').text() != "" && $('#loginUser3').text() != "") {
    //         window.location.href = "./GameHome.html";
    //         $('.Box1').hide();
    //         $('.Box2').hide();
    //         $('.Box3').hide();
    //         $('.Box4').hide();
    //     } else if ($('#loginUser1').text() != "" && $('#loginUser2').text() != "" && $('#loginUser3').text() != "" && $('#loginUser4').text() != "") {
    //         window.location.href = "./GameHome.html";
    //         $('.Box1').hide();
    //         $('.Box2').hide();
    //         $('.Box3').hide();
    //         $('.Box4').hide();
    //     }
  } else {
    window.location.href = "./AddingPlayer.html";
  }
};
$(document).ready(function () {
  // console.log('All assets are loaded')
  $("#firstPlayer").html(localStorage.content);
  $(".Box1").show();
  $(".Box2").show();
  $(".Box3").show();
  $(".Box4").show();
});
const leave = () => {
  localStorage.clear();
  window.location.href = "./HomePage.html";
};
