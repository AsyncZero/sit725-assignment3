const MongoClient = require("mongodb").MongoClient;
const express = require("express");

const uri =
    "mongodb+srv://dbuser:dbuserpassword@cluster0.o0rbr.mongodb.net/loveletter?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



// Insert Message into database
let documentsCollection;
const openConnectionPlayers = () => {
 Aamir-Preeti
  client.connect((err) => {
    documentsCollection = client.db("loveletter").collection("players");

    if (!err) {
      console.log("Database Connected");

        }
  });
};



    client.connect((err) => {
        documentsCollection = client.db("LoveLetter").collection("players");
        if (!err) {
            console.log("Database Connected");
        }
    });
};
const insertPlayer = (players) => {
    documentsCollection.insertOne({
        players: players,
        "timestamp": new Date()
    });
}
const retrievePlayer = (res) => {
    documentsCollection.find().toArray(function(err, result) {
        if (err) throw err;
        res.send(result)
    });
}
 master
module.exports = {
    openConnectionPlayers,
    insertPlayer,
    retrievePlayer,
};