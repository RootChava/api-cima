const keys = require('../config');
module.exports = {
    device_data_handling: (req, res) => {
        if(req.body.secret === keys.secret){
            res.json(req.body.data);
        } else {
            res.send("MMMMMMMMMM ALGO ANDA MAL");
        }
    }
};