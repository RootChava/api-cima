const keys = require('../config');
const connectedUser = require('../connectedUser').connectedUser;
const wsBluetooth = require('../dataPersistent').wsBluetooth;

module.exports = {
    bluetooth_data_handling: (req, res) => {
        if (req.body.secret === keys.secret) {
            if (connectedUser.length > 0) {
                connectedUser.map(user => {
                    console.log(user.send(JSON.stringify({
                        bluetooth: req.body.data
                    })));
                });
            } else {
                wsBluetooth.push({
                    bluetooth: req.body.data
                });
            }
            res.json(req.body.data);
            // res.send("OK");
        } else {
            res.status(401).send("Unauthorized");
        }
    }
};