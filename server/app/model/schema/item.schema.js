'use strict';
var mongoose = require('mongoose');
//var crypto = require('crypto');
var Schema = mongoose.Schema;



var cfi_feeback_Schema = new Schema({
   name:{
        type: String,
        required: true
      },
   phonenumber:{
        type: Number,
        required: true
      },
   rating:{
        type: Number,
        required: true
      },
   remarks:String,
   
   created: { type: Date, default: Date.now },
});

var cfi_items = new Schema({
   itemId:{
        type: String,
        required: true
      },
   type:{
        type: String,
        required: true
      },
   city:{
        type: String,
        required: true
      },
   area:{
        type: String,
        required: true
      },
   state:{
        type: String,
        required: true
      },
   feedback:[cfi_feeback_Schema],
   updated: { type: Date, default: Date.now },
   
});


var cfi_feedback_Top = new Schema({
   name:{
       type: String,
       required: true
      },
   phonenumber:{
       type: Number,
       required: true
      },
   rating:{
       type: Number,
       required: true
      },
   remarks:String,
   statuse:Boolean,
   createdOn:{
      type: Date,
      default:Date.now
   }
});


mongoose.model('cfi_item',cfi_items);
mongoose.model('Analytics',cfi_feedback_Top);

