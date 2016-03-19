'use strict';
/*var Telenode = require('telenode');
var client = new Telenode(Telenode.providers.twilio);
 
client.credentials({
  sid: 'ACc302210e3dc657a16d79625d8521f4d2',
authToken: '3b14a4c7413647d2d367a2bb308027b2'
});*/
 
 var accountSid = 'ACc302210e3dc657a16d79625d8521f4d2'; 
var authToken = '3b14a4c7413647d2d367a2bb308027b2'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
 



module.exports = (function(){
   const config = require('../../config/config'),
          feedback = require('../../app/model/feedback.model.js'),
          analytics= require('../../app/model/analytics.model.js'),
          debug = require('debug')('main:feedback-controller'),
          that = {};
          
    that.add = (req,res,next) => {
   
      // analytics.insert(req.body.data.feedback);
         feedback.insert(req.body.data,function(err,result){
         if(err){
             next(err);
         } else{ 
             
         res.json({
            'success':1,
            'message':'feedback inserted',
            'data':result
            });   
         }
         client.messages.create({ 
             from:"+919968500931",
        	to: "+918800691089",  
        	body: "Test",   
        }, function(err, message) { 
            if(err){
        	console.log(err);
            }
            console.log(message);
        });
         global.io.emit('newPush', req.body.data);
         
      });
     
    };
    
    that.fetchById = (req,res,next) => {
        feedback.fetchById(req.params.itemId,function(err,result){
            if(err){
                next(err);
            }
            res.json({
                    success: 1,
                    message:'Feedback Found',
                    'data': result,
            });  
        })
    };
    
    that.delete = (req,res,next) => {
      feedback.delete({"itemId":req.query.itemId,"phonenumber":req.query.phonenumber},function(err,result){
          if(err){
                next(err);
            }
            res.json({
                    success: 1,
                    message:'Feedback Deleted',
                    'data': result,
            });  
      })  
    };
    
    that.findInOneDay=  function(req,res,next){
        analytics.getinOneDay(function(err,result){
            if(err){
                next(err);
            }
            res.json({
                    success: 1,
                    message:'Recent Feedback Sent',
                    'data': result,
            });  
        });
    };
    
    
    
    return that;
})();