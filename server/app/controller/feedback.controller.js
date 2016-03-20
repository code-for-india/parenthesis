'use strict';

module.exports = (function(){
   const config = require('../../config/config'),
          feedback = require('../../app/model/feedback.model.js'),
          analytics= require('../../app/model/analytics.model.js'),
          debug = require('debug')('main:feedback-controller'),
          that = {};

    that.add = (req,res,next) => {

         analytics.insert(req.body.data.feedback);
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
