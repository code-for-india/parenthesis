'use strict';

module.exports= (function(){
    const config = require('../../config/config'),
          Data = require('mongoose').model('cfi_item'),
         // Top = require('mongoose').model('cfi_feedback_Top'),
          item = require('../../app/model/item.model.js'),
          debug = require('debug')('main:feedback-mongo'),
          that={};
    
    that.insert = (_data,cb) =>{
        
        debug(_data);
        const data = new Data(),
              query = {"itemId":_data.itemId};
                  
        Data.update(query,{$push: {"feedback" : _data.feedback}}, function(err,data){
                   if(err){
                       cb(err);
                   }
                   cb(null,data);
            });
        
    };
    
    // //TOFIX
    // that.update = (_data,cb)=>{
    //     const data = new Data(_data);
        
        
    //     Data.update({'itemNo':_data.itemNo},
    //                 {$set:{'value':_data.value}},function(err,data){
    //                 if(err){
    //                     debug('Error: Feedback Updating failure');
    //                     cb(err);
    //                 }       
    //                 cb(null,data);  
    //             })
    
    // };
    
    that.fetchById = (_data,cb) => {
        Data.find({'itemId': _data},(err,data)=>{
           if(err){
                debug('Error: Feedback retrival failure');
                cb(err);
           }
           
           cb(null,data);
        });
    };
    
    that.delete = (_data,cb) => {
        Data.findOne({ 'itemId': _data.itemId },'feedback', function(err,data) {
          if(err){
                debug('Error: Delete Feedback 1');
                cb(err);
          }
          
          data.feedback = data.feedback.filter((item)=>{
              
              return item.phonenumber !== _data.phonenumber ;
          });
          
          data.save(function(err){
              if(err){
                debug('Error: Delete Feedback 2');
                cb(err);
              };
              cb(null,"deleted");
          });
     
        });
    };
    
    
    
    return that;
    
})();