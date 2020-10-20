const express = require("express");
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

//Server Run
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server listening on http://localhost:" + PORT + "/game");
});


//Card deck

const express = require('express');
const app = express();
const server = require('http').Server(app);
const escape = require('escape-html');


app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/table.html');
});









server.listen(1433, function() {
    console.log('Server Started On 127.0.0.1:1433');
});
