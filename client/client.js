console.log("client.js loaded");
const socket = io();

function сreateGame() {
  console.log("createGame");
  socket.emit("createGame");
}

function joinGame() {
  roomUniqueId = document.getElementById("roomUniqueId").value;
  socket.emit("joinGame", { roomUniqueId: roomUniqueId });
  console.log("joinGame " + roomUniqueId)
}
