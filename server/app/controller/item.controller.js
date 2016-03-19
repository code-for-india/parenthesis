'use strict';

module.exports = (function(){
    const config = require('../../config/config'),
          item = require('../../app/model/item.model.js'),
          debug = require('debug')('main:item-controller'),
          that = {};
          
    
    that.add = (req,res,next)=>{
        console.log(req.body);
        //checking if key is already present
        item.exists(req.body.data,function(err,result){
            if(err){
                next(err);
            }
            
            if( result !== null ){
                //item already exist 
                      
                res.json({
                    success: 0,
                    message:'Item already present',
                    'data': result,
                    });  
                
            }else{
                //inserting the new key/value pair
                item.insert(req.body.data,function(err,result){
                    if(err){
                        next(err);
                    }
                    res.json({
                            success: 1,
                            message:'Data inserted',
                            'data': result,
                            });                
                });
            }
        });
    };
    
    that.update = (req,res,next) => {
      item.update(req.body.data,function(err,result){
           debug(req.body.data);
            if(err){
                next(err);
            }
            res.json({
               success:1,
               message:'Data Updated',
               'data':result,
            });
      });
    };
    
    that.delete = (req,res,next) => {
        
        item.deleteByItemId(req.params.itemId,function(err,result){
            if(err){
                next(err);
            }
            res.json({
                    success: 1,
                    message:'Data deleted',
                    'data': result,
            }); 
        });
    };
    
    that.fetch = (req,res,next) => {
        item.fetchDetails(function(err,result){
            if(err){
                next(err);
            }
            res.json({
                    success: 1,
                    message:'Item Found',
                    'data': result,
            });             
        });
    };
    
    that.fetchAll = function(cb){
        item.fetchAll(function(err,result){
            if(err){
                debug("Error while fetching All Data");
                cb(err);
            }
            debug("Done Fetching");
            cb(null,result);
        });
        
    };
    
    //analytics
    that.rating = (req,res,next)=>{
      that.fetchAll(function(err,result){
          if(err){
              debug("Error rating");
              next(err);
          }
          
          // use for in loop for obj.
          const obj={};
          for(var v of result){
              if(obj[v.city]===undefined){
                  
                  obj[v.city] = {
                      "feedback_count":0,
                      "rating_total":0
                  };
             }
             obj[v.city].feedback_count += v.feedback.length;
 
              let sum=0;
              for(var f of v.feedback){
                  sum+=parseInt(f.rating,10);
              }
              obj[v.city].rating_total += sum;
        }
        
        var arr =[];
        var feedback_total=0;
        for(var v in obj){
            
            var per = ((obj[v].rating_total/obj[v].feedback_count)*100).toPrecision(2);
            var rat = 100-per;
            feedback_total += obj[v].feedback_count;
            arr.push({
                city:v,
                positive:per,
                negative:rat,
                "feedback_count":obj[v].feedback_count
            });
        }
        
        res.json({
                success: 1,
                'data': arr,
                'total': feedback_total
            });  
          
      });
    };
        
    
    that.fetchById = (req,res,next) => {
        
        item.fetchById(req.params.itemId,function(err,result){
            if(err){
                next(err);
            }
            res.json({
                    success: 1,
                    message:'Item Found',
                    'data': result,
            });             
        });
    };
    
    that.fetchByCity = (req,res,next)=>{
        item.fetchByCity(req.params.city,function(err,result){
            if(err){
                next(err);
            }
            res.json({
                    success: 1,
                    message:'Data deleted',
                    'data': result,
            });             
        })
    };
          
    return that;
    
})();