const express = require("express");
const bodyParser = require("body-parser");
const WebSocketServer = require('websocket').server;
const http = require('http');

const { key_scanning } = require('./routes/scanning');
const { device_data_handling } = require('./routes/device');
const { bluetooth_data_handling } = require('./routes/bluetooth');
const { wsRequest } = require('./routes/wsHandler');

const app = express();
const port = 8090;
const server = http.createServer(app);

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

server.listen(process.env.port || port, () => {
  console.log("WEBSOCKET SERVER AND HTTP SERVER RUNNING IN PORT: " + process.env.port || port);
});
const wsServer = new WebSocketServer({
  httpServer: server,
  path: "/connectws/"
});

wsServer.on("request", wsRequest);