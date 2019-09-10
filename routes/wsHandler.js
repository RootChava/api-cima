const connectedUser = require('../connectedUser').connectedUser;
const { wsDevices, wsBluetooth } = require('../dataPersistent');

module.exports = {
    wsRequest: (request) => {
        console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
        const connection = request.accept(null, request.origin);
        const index = connectedUser.push(connection) - 1;

        let i = wsDevices.length;
        while (i--) {
            connection.send(JSON.stringify(wsDevices[i]));
            wsDevices.splice(i, 1);
        }
        i = wsBluetooth.length;
        while (i--) {
            connection.send(JSON.stringify(wsBluetooth[i]));
            wsBluetooth.splice(i, 1);
        }

        connection.on('close', (connection) => {
            console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
            connectedUser.splice(index, 1);
        });
    },
};