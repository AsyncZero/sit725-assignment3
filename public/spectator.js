let username;
const role = "spectator";
let spectators = [];
//let room = "spectators";

$(function () {
    //check if document URL is AddingPlayer.html
    if (document.URL == "http://localhost:3000/AddingPlayer.html") {
        //set default role as player
        localStorage.role = "player";
    }

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

    //check if document URL is GameHome.html
    if (document.URL == "http://localhost:3000/GameHome.html" && localStorage.role == "spectator") {
        //make every div with card class unclickable for spectator
        $('.card').addClass("unclickable");
    } else {
        $('.card').removeClass("unclickable");
    }
})

//AddSpectatorButton()
function AddSpectatorButton() {
    //gettting the values
    nameInput = document.getElementById("PlayerName").value;
    if (validateSpectator(nameInput)) {
        //pass username to localStorage.content
        localStorage.content = username;
        //set userdata to localStorage
        localStorage.role = role;
        //Create Spectator and Add to Spectator List
        var spectator = addSpectator(nameInput);
        addToSpectatorList(spectator);
        //redirect to playerList.html
        window.location.href = "./playerList.html";
    } else {
        alert("Please Enter A Valid Name")
        document.getElementById('PlayerName').style.background = 'red';
        document.getElementById("PlayerName").focus();
    }
}

//add to spectator list
function addToSpectatorList(spectator) {
    //add to spectator an array of spectators
    spectators.push(spectator);
    return spectators;
}

function addSpectator(nameInput) {
    if (validateSpectator(nameInput)) {
            let spectator = {
            username: nameInput,
            role: role
        }
        return spectator;
    } else {
        return "You have enterd an invalid name";
    }
}

function validateSpectator(nameInput) {
    const errorMessage = "Please enter a valid name!";
    if (isNotEmpty(nameInput) && isNotANumber(nameInput) && isNotNull(nameInput)) {
        username = nameInput;
        return username;
    }
    else {
        return false;
    }
}

//check if username is not Empty
function isNotEmpty(nameInput) {
    if (nameInput != '') {
        return true;
    } else {
        return false;
    }
}

//check if username is not a number
function isNotANumber(nameInput) {
    if (isNotNull(nameInput)) {
        if (!nameInput.match(/^\d+$/)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false
    }
    
}

//check if not null
function isNotNull(nameInput) {
    if (nameInput != null) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    addSpectator,
    addToSpectatorList,
    validateSpectator
}

//remove player buttons
// function hideplayerbuttons(htmlElement){
//     document.getElementById(htmlElement).style.display = "none";
// }

//hide spectator chats from players
// function sendMSG(message, userID) {
//     let spectator;
//     spectators.forEach(function(s) {
//         if(spectators.userID == userID){
//             spectator = s;
//         }
//     })
//     let data ={
//         spectator: spectator,
//         message: message
//     }
//     return data;
// }