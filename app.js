const express = require("express");
const { openConnectionPlayers } = require("./services/MongoService");
const mongo = require("./services/MongoService");
let app = new express();

// Setup DB
mongo.openConnectionPlayers();
//printing logs
var log = function(logMessage) {
    var time = moment().format();
    console.log("[" + time + "]" + "" + logMessage);
};
//direct app to fetch relevant files
app.use(express.static(__dirname + "/public"));
//set endpoint to html file
app.get("/Game", function(req, res) {
    res.sendFile(__dirname + "/public/HomePage.html");
});



app.get("/player", function(req, res) {
    let players = req.query.players;
    mongo.insertPlayer(players);
    res.send('player added')
})

app.get('/playerLists', function(req, res) {
    mongo.retrievePlayer(res)
})

//Server Run
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server listening on http://localhost:" + PORT + "/game");
});