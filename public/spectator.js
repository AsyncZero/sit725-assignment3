let username;
const role = "spectator";
let spectators = [];

//AddSpectator() for Button in AddingPlayer.html
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
        let data = {
            username: username,
            role: role
        }
        //set userdata to localStorage
        localStorage.spectator = JSON.stringify(data);
        //add user to list of spectators
        addToSpectatorList(username)
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
    spectators.push(data)
}

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
