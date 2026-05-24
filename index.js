const express = require("express");
const app = express();
const http = require('http');
const port = 3060;


const server = http.createServer(app);


app.get('/healthcheck', (req, res) => {
    res.send('<h1>RPS App running...</h1>');
});


server.listen(port, () => {
    console.log(`listening on *:${port}`);
});
