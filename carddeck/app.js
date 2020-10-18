const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const escape = require('escape-html');


app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

let rooms = {};
let img = '../img/';

let cardsDeck = {
    1: {
        id: 1,
        name: 'guard',
        image: img + 'guard.PNG'
    },
    2: {
        id: 2,
        name: 'priest',
        image: img + 'priest.PNG'
    },
    3: {
        id: 3,
        name: 'baron',
        image: img + 'baron.PNG'
    },
    4: {
        id: 4,
        name: 'handmaid',
        image: img + 'handmaid.PNG'
    },
    5: {
        id: 5,
        name: 'prince',
        image: img + 'prince.PNG'
    },
    6: {
        id: 6,
        name: 'king',
        image: img + 'king.PNG'
    },
    7: {
        id: 7,
        name: 'countess',
        image: img + 'countess.PNG'
    },
    8: {
        id: 8,
        name: 'princess',
        image: img + 'princess.PNG'
    }
};




let buildDeck = function() {
    let deck = [];
    for (i = 0; i < 5; i++) {
        deck.push(cardsDeck[1])
    }
    for (i = 0; i < 2; i++) {
        deck.push(cardsDeck[2]);
        deck.push(cardsDeck[3]);
        deck.push(cardsDeck[4]);
        deck.push(cardsDeck[5]);
    }
    deck.push(cardsDeck[6]);
    deck.push(cardsDeck[7]);
    deck.push(cardsDeck[8]);
    return deck;
};

function addPlayer(id, username) {
    return {
        id: id,
        username: username,
        hand: [],
        discarded: [],
        points: 0,
        isAlive: false,
    }
}



function Randomize(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


function FindGameRoom(socket) {
    let roomData = null;
    Object.keys(socket.rooms).forEach(function(room) {
        if (rooms[room]) {
            let player = rooms[room].players.find(p => p.id === socket.id);

            if (player) {
                roomData = {
                    room: room,
                    username: player.username
                };
            }
        }
    });
    return roomData;
}

function GetRoomPlayers(room, id) {
    let players = [];
    room.players.forEach(function(player) {
        if (player.id !== id) {
            players.push({
                username: player.username,
                discarded: player.discarded,
                points: player.points,
                isAlive: player.isAlive,
            })
        }
    });
    return players;
}

function StartGame(room) {
    room.deck = Randomize(buildDeck());
    room.discarded = [];
    room.disconnected = [];
    if (room.players.length === 2) {
        for (i = 0; i < 3; i++) {
            room.discarded.push(room.deck.shift());
        }
    }
    room.wildcard = room.deck.shift();
    room.players.forEach(function(player) {
        player.hand = [room.deck.shift()];
        player.discarded = [];
        player.isAlive = false;
        player.isProtected = false;

        io.to(player.id).emit('gameStarted', {
            hand: player.hand,
            discarded: room.discarded
        });
    });
    room.turn = Math.floor(Math.random() * room.players.length);
    room.playing = true;
}



io.on('connection', function(socket) {
    console.log('New Player  connected');
    socket.on('NewGameRoom', function(data) {
        if (!data.username) {
            console.log('Please enter a username');
            return;
        }

        if (data.room_name.length) {
            let room_name = escape(data.room_name);
            let username = escape(data.username);
            let room = io.sockets.adapter.rooms[room_name];
            if (!room) {
                socket.join(room_name);
                console.log('room: ' + room_name + ', created by ' + username);
                socket.emit('joined', {
                    username: username,
                    player_num: 1,
                    players: []
                });
                room = {
                    id: room_name,
                    players: [addPlayer(socket.id, username)],
                    disconnected: []
                };
                rooms[room_name] = room;
            } else {
                console.log('This room already exists');
            }
        } else {
            console.log('Enter a Name');
        }
    });

    socket.on('joinRoom', function(data) {
        if (!data.username) {
            socket.emit('err', {
                reason: 'Please enter a username'
            });
            return;
        }

        if (data.room_name.length) {
            let room_name = escape(data.room_name);
            let username = escape(data.username);
            let room = io.sockets.adapter.rooms[room_name];

            if (room && rooms[room_name]) {
                room = rooms[room_name];
                if (room.players.length < 4) {
                    if (room.players.findIndex(p => p.username === username) === -1) {
                        socket.join(room_name);
                        room.players.push(addPlayer(socket.id, username));
                        if (room.playing) {
                            room.players[room.players.length - 1].isAlive = true;
                        }
                        console.log('room: ' + room_name + ', joined by ' + username);
                        socket.emit('joined', {
                            player_num: room.players.length + 1,
                            username: username,
                            isAlive: room.playing,
                            players: GetRoomPlayers(room, socket.id)
                        });

                        socket.to(room_name).emit('joinedRoom', {
                            player_num: room.players.length + 1,
                            username: username,
                            isAlive: room.playing
                        });
                        console.log(username + ' joined the room');
                    } else {
                        console.log('Username is already taken');
                    }
                } else {
                    console.log('Game Room is full');
                }
            } else {
                console.log('Game Room not found');
            }
        } else {
            console.log('Please enter a valid room name');
        }
    });

    socket.on('startGame', function() {
        let r = FindGameRoom(socket);
        let room = rooms[r.room];

        if (room.playing) {
            socket.emit('gameStarted', {
                discarded: room.discarded
            });
            socket.emit('updateDeck', {
                cards_remaining: room.deck.length
            });
        } else {
            if (room && room.players.length > 1) {
                StartGame(room);
            } else {
                console.log('Not enough players to play the game');
            }
        }
    });

});

server.listen(1433, function() {
    console.log('Server Started On 127.0.0.1:1433');
});
