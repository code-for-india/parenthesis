'use strict';
var mongoose = require('mongoose');
//var crypto = require('crypto');
var Schema = mongoose.Schema;
 
var cfi_users_Schema = new Schema({
   username:{
        type: String,
        required: true,
        unique: true 
      },
   password:{
        type: String,
        required: true
      },
   email:{
        type: String,
        required: true
      }
});

// TODO: Add module to save encrypted password in database using crypto
mongoose.model('cfi_users',cfi_users_Schema);
