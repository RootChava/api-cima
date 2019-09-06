const express = require("express");
const bodyParser = require("body-parser");
const { key_scanning } = require('./routes/scanning');
const { device_data_handling } = require('./routes/device');
const { bluetooth_data_handling } = require('./routes/bluetooth');
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

app.listen(port, () => {
    console.log('CIMA API RUNNING IN PORT: ' + port);
  });