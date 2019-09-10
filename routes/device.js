const keys = require('../config');
const connectedUser = require('../connectedUser').connectedUser;
const wsDevices = require('../dataPersistent').wsDevices;

module.exports = {
    device_data_handling: (req, res) => {
        if (req.body.secret === keys.secret) {
            if (connectedUser.length > 0) {
                connectedUser.map(user => {
                    console.log(user.send(JSON.stringify({
                        device: req.body.data
                    })));
                });
            } else {
                wsDevices.push({
                    device: req.body.data
                });
            }
            res.json(req.body.data);
            // res.send("ok");
        } else {
            res.status(401).send("Unauthorized");
        }
    }
};