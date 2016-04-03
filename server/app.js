'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const debug = require('debug')('main:app'),
      config = require('./config/config'),
      port = config.port || process.env.PORT;

//initialising mongoose and DB Schema
require('./config/mongoose')();
//start express server
const app = require('./config/express')(),
      server =  require('http').Server(app);
      //socket
      io = require('./config/socket')(server);
global.io = io;

//add middlewares to express
require('./middleware/base.middleware')(app);

//add routes
require('./app/routes/base.route')(app);
require('./app/routes/socket.route')(io);

//handle errors
require('./app/routes/handleError')(app);

//app.listen(port);
debug(`Server running in ${app.get('env')} environment, listening on port: ${port}`);
