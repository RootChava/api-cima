const keys = require('../config');
const request = require('request');

let options = {
    headers: {
        'x-api-key': keys.api_key,
        'Content-Type': 'application/json'
    },
    uri: keys.url + '/device',
    method: 'POST',
    json: true,
    body: {}
};

module.exports = {
    bluetooth_data_handling: (req, res) => {
        if (req.body.secret === keys.secret) {
            options.body = req.body.data;
            request(options, (error, response, body) => {
                if (error) {
                    console.log(error);
                    res.status(500).send("ERROR AL ENVIAR DATOS AL NIFI");
                } else {
                    console.log(body);
                    res.json(req.body.data);
                    // res.send("OK");
                }
            });
        } else {
            res.status(401).send("Unauthorized");
        }
    }
};