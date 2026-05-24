const express = require("express");
const app = express();
const http = require('http');
const path = require('path');
const port = 3060;

const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server);

const rooms = {};


// app.get('/', (req, res) => {
//     res.send('<h1>Start...</h1>');
// });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});


app.get('/test', (req, res) => {
    res.send('<h1>RPS App running...</h1>');
});

app.use(express.static(path.join(__dirname, 'client')));

io.on("connection", (socket) => {
  console.log(`a user ${socket.id} is connected`); 

   socket.on("createGame", () => {
    console.log("createGame");
    const roomUniqueId = makeid(12);
    console.log(roomUniqueId);
    rooms[roomUniqueId] = {};
    //console.log(rooms);
    socket.join(roomUniqueId);
    socket.emit("newGame", { roomUniqueId: roomUniqueId });
  });



  socket.on("disconnect", () => {
    console.log(`user ${socket.id} is disconnected`);
  });

});


server.listen(port, () => {
    console.log(`listening on *:${port}`);
});


function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
