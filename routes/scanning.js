const keys = require('../config');
module.exports = {
    key_scanning: (req, res) => {
        res.send(keys.validation);
    },
    data_handling: (req, res) => {
        if(req.body.secret === keys.secret){
            res.json(req.data);
        } else {
            res.send("MMMMMMMMMM ALGO ANDA MAL");
        }
    }
};