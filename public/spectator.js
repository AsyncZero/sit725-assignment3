let userID;
let username;
let spectators = [];
let room = "spectators";

//add to spectator list
function addSpectator(userID, username) {
    let data = {
        userID: userID,
        username: username,
        room: room
    }
    spectators.push(data)
}

//remove player buttons

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