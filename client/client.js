console.log("client.js loaded");
const socket = io();
let roomUniqueId = null;

function сreateGame() {
  console.log("createGame");
  socket.emit("createGame");
}

function joinGame() {
  roomUniqueId = document.getElementById("roomUniqueId").value;
  socket.emit("joinGame", { roomUniqueId: roomUniqueId });
  console.log("joinGame " + roomUniqueId);
}

socket.on("newGame", (data) => {
  roomUniqueId = data.roomUniqueId;
  console.log("newGame " + roomUniqueId);
  document.getElementById("initial").style.display = "none";
  document.getElementById("gamePlay").style.display = "block";
  let copyButton = document.createElement("button");
  copyButton.style.display = "block";
  copyButton.innerText = "Copy Code";
  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(roomUniqueId).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      },
    );
  });

  document.getElementById("waitingArea").innerHTML =
    `Waiting for opponent, please share code ${roomUniqueId} to join`;
  document.getElementById("waitingArea").appendChild(copyButton);
});
