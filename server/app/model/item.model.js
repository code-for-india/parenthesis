'use strict';

module.exports= (function(){
    const config = require('../../config/config'),
          Data = require('mongoose').model('cfi_item'),
          debug = require('debug')('main:item-model'),
          that={};
          
    that.exists = (_data,cb)=>{
        Data.findOne({itemId:_data.itemId},(err,data)=>{
            if(err){
                debug('Error: Checking if item exists.');
                cb(err);
            }
            cb(null,data);
        });
    };
          
    that.insert = (_data,cb) =>{
        const data = new Data(_data);
    
        data.save((err)=>{
            if(err){
                debug('Error: Item insertion failure');
                cb(err);
            }
            cb(null,data);
        });
    };
    
    
    that.update = (_data,cb)=>{
        debug(_data);
        const data = new Data(_data);
        
        //TOFIX: check updateOne
        Data.update({'itemId':_data.itemId},_data,function(err,data){
            if(err){
                debug('Error: Data Updating failure');
                cb(err);
            }       
            cb(null,data);  
        });
    
    };
    
    that.deleteByItemId = (_data,cb) => {
        debug(_data);
        Data.remove({ 'itemId': _data}, function(err) {
          if(err){
                debug('Error: Data retrival failure');
                cb(err);
           }
           cb(null);
        });
    }; 
    
    that.fetchDetails = (cb) => {
        Data.find({},'itemId type city area state updated',(err,data)=>{
           if(err){
                debug('Error: Data retrival failure');
                cb(err);
           }
           cb(null,data);
        });
    };
    
    that.fetchAll = (cb) => {
        Data.find({},(err,data)=>{
           if(err){
                debug('Error: Data retrival failure');
                cb(err);
           }
           cb(null,data);
        });
    };
   
    
    that.fetchById = (_data,cb) => {
        debug(_data);
        Data.findOne({'itemId':_data},(err,data)=>{
            if(err){
                debug('Error: Data retrival failure');
                cb(err);
            }
            cb(null,data);
        });
    };
    
    that.fetchByCity = (_data,cb) => {
        debug(_data);
        Data.find({'city': _data},'itemId type city area state updated',(err,data)=>{
          if(err){
                debug('Error: Data retrival failure');
                cb(err);
          }
          cb(null,data);
        });
    };
    
    return that;
    
})();