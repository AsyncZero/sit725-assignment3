const MongoClient = require("mongodb").MongoClient;
const express = require("express");

const uri =
    "mongodb+srv://dbuser:dbuserpassword@cluster0.o0rbr.mongodb.net/loveletter?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



// Insert Message into database
let documentsCollection;

const openConnectionPlayers = () => {
    client.connect((err) => {
        documentsCollection = client.db("LoveLetter").collection("players");
        if (!err) {
            console.log("Database Connected");
        }
    });
};
const insertPlayer = (players) => {
    documentsCollection.insertOne({ players: players });
}
const retrieveMessages = (res) => {
    documentsCollection.find().toArray(function(err, result) {
        if (err) throw err;
        res.send(result)
    });
}
module.exports = {
    openConnectionPlayers,
    insertPlayer,
    retrieveMessages,

};