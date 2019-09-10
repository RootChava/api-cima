const keys = require('../config');
module.exports = {
    key_scanning: (req, res) => {
        res.send(keys.validation);
    }
};