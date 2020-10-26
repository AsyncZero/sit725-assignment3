let userID;
let username;
let spectators = [];
let room = "spectators";

//================AddingPlayer.html================
$(function () {
    //check if document URL is AddingPlayer.html
    if (document.URL == "http://localhost:3000/AddingPlayer.html") {
        //set default role as player
        localStorage.role = "player";
    }
})
//AddSpectator() for Button
function AddSpectator() {
    //gettting the values
    username = document.getElementById("PlayerName").value;
    //entering name validation present or not
    if (username == '') {
        alert("Please add your name!");
        document.getElementById('PlayerName').style.background = 'red';
        document.getElementById("PlayerName").focus();
    }
    //check if only number enetered using regex
    else if (username.match(/^\d+$/)) {
        alert("Please add a valid name!");
        document.getElementById("PlayerName").focus();
    } else {
        //pass username to localStorage.content
        localStorage.content = username;
        //set userdata to localStorage
        localStorage.role = role;
        //add user to list of spectators
        addToSpectatorList(username);
        //redirect to playerList.html
        window.location.href = "./playerList.html";
    }
}

//add to spectator list
function addToSpectatorList(username) {
    let data = {
        username: username,
        role: role
    }
    spectators.push(data);
    return spectators;
}


//================playerList.html================
$(function() {
    //check if document URL is playerList.html
    if (document.URL == "http://localhost:3000/playerList.html" && localStorage.role != "") {
        //check if user's role is a spectator then do some appropriate changes to playerList.html
        if (localStorage.role == "spectator") {
            //get header by className
            let header = document.getElementsByClassName("players");
            //change text of header to Spectators
            header[0].textContent = "Spectators";
            //change play button text to Watch
            document.getElementById("play").textContent = "Watch";
        }
    }
})


//================GameHome.html================
$(function () {
    //check if document URL is GameHome.html
    if (document.URL == "http://localhost:3000/GameHome.html" && localStorage.role == "spectator") {
        //get div cards by className
        let cards = document.getElementsByClassName("card");
        //make every div unclickable
        for (let i = 0; i < cards.length; i++) {
            $('.card').addClass("unclickable");
        }
    }
})
//remove player buttons
function hideplayerbuttons(htmlElement){
    document.getElementById(htmlElement).style.display = "none";
}

//hide spectator chats from players
function sendMSG(message, userID) {
    let spectator;
    spectators.forEach(function(s) {
        if(spectators.userID == userID){
            spectator = s;
        }
    })
    let data ={
        spectator: spectator,
        message: message
    }
    return data;
}
    
//set card view of spectators

//greet spectator after successfully joining

//spectator left log

//let spectator know if game has updated
