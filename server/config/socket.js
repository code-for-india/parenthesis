'use strict';
/**
 * Setting up socket connection.
 *
 */



module.exports = function(server){

    //getting instance of Express
    const io = require('socket.io')(server);
    return io;
};
