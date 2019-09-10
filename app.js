const express = require("express");
const bodyParser = require("body-parser");
const WebSocketServer = require('websocket').server;
const http = require('http');

const { key_scanning } = require('./routes/scanning');
const { device_data_handling } = require('./routes/device');
const { bluetooth_data_handling } = require('./routes/bluetooth');
const { wsRequest } = require('./routes/wsHandler');

const server = http.createServer((request, response) => {});
server.listen(1337, () => {
  console.log("WEBSOCKETSERVER RUNNING IN PORT: " + 1337);
});
const wsServer = new WebSocketServer({
  httpServer: server
});

const app = express();
const port = 8090;

app.set('port', process.env.port || port);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get("/scanning/", key_scanning);
app.post("/device/", device_data_handling);
app.post("/bluetooth/", bluetooth_data_handling);
app.all("*", (req, res) => {
  res.status(404).send("NOT FOUND");
});

wsServer.on("request", wsRequest);

app.listen(port, () => {
    console.log('CIMA API RUNNING IN PORT: ' + port);
});