console.log("client.js loaded");
const socket = io();

function сreateGame() {
  console.log("createGame");
  socket.emit("createGame");
}
