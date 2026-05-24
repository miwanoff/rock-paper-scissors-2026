const express = require("express");
const app = express();
const http = require('http');
const path = require('path');
const port = 3060;

const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server);




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
  console.log("a user is connected"); 

  
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

});


server.listen(port, () => {
    console.log(`listening on *:${port}`);
});
