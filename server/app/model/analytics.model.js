'use strict'; 

module.exports= (function(){
    const config = require('../../config/config'),
         // Data = require('mongoose').model('cfi_item'),
          Analytics = require('mongoose').model('Analytics'),
         // item = require('../../app/model/item.model.js'),
          debug = require('debug')('main:feedback-mongo'),
          that={};
   
    that.insert = (_data) =>{
        
        debug(_data);
        const data = new Analytics(_data);
        data.save((err)=>{
            if(err){
                debug('Error: Analytics insertion failure');
                //cb(err);
                
            }
           // cb(null,data);
        });
    
    };
 //   db.collection.find({ $where: function () { return Date.now() - this._id.getTimestamp() < (24 * 60 * 60 * 1000)  }  })
    that.getinOneDay = (cb) => {
        Analytics.find({ $where: function () {
            return Date.now() - this._id.getTimestamp() < (24 * 60 * 60 * 1000) 
            } },(err,data)=>{
           if(err){
                debug('Error: Data retrival failure');
                cb(err);
           }
           cb(null,data);
        });
    };
        

   
    
    
    return that;
    
})();