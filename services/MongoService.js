const MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://dbuser:dbuserpassword@cluster0.o0rbr.mongodb.net/loveletter?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

// Insert Message into database
let documentsCollection;

const openConnectionPlayers = () => {
  client.connect((err) => {
    documentsCollection = client.db("loveletter").collection("players");
    if (!err) {
      console.log("Database Connected");
    }
  });
};

module.exports = {
  openConnectionPlayers,
};
