'use strict';

module.exports = function(){
  const config = require('./config'),
        mongoose = require('mongoose'),
        debug = require('debug')('main:mongoose');
  
  const db = mongoose.connect(config.db); 
  debug('Connected to Database.');
  
  require('../app/model/schema/user.schema');
  require('../app/model/schema/item.schema');
  
  debug('Model Created');
  
  return db;    
};