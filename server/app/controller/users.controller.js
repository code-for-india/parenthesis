'use strict';
module.exports = (function(){
    const config = require('../../config/config'),
          User = require('mongoose').model('cfi_users'),
          debug = require('debug')('main:user-controller'),
          jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
    
    // TODO: Add validation module.
    
    var that={}; 
        
    that.create = (req,res) =>{ 
        const username_data = req.body.username || req.query.username || '',
              password_data = req.body.password || req.query.password || '',
              email_data = req.body.password || req.query.email || '',
              user_data = {
                  'username':username_data,
                  'password':password_data,
                  'email':email_data,
              };
        
        if(username_data !== '' && password_data !== ''){
        var user = new User(user_data);
        
        user.save((err)=>{
            if(err){
                //next(err);
                // FIXME: handle database error efficiently
                debug('Account creation failure, Error: ',err);
                res.json({
                    success:false,
                    message:'Failed to create user account'
                });
            }else{
                debug('User account successfully created.');
                res.json({
                    success:true,
                    message:'User Account created',
                    user: user,
                    });                
            }
        });
        }else{
            console.log(req.body + req.query.username);
            res.json({
               success:false,
               message:'Body is empty'
            });
        }
    };
    
    that.authenticate = (req,res)=>{
        User.findOne({
            username:req.query.username || req.body.data.username
        },function(err, user){
           
           if(err) {
               throw err;
           }
           
           if(!user){
               res.json({
                   success:false,
                   message:'Authentication failed. '+ 
                    'User not found.'
                   });                   
           }else{
            
               if(user.password !== (req.query.password || req.body.data.password) ){
                   res.json({
                       success:false,
                       message:'Authentication failed. '+ 
                        'UserName/Password is invalid.'
                       });
                                          
               } else {
                   
                    debug('User authenticated');
    				// if user is found and password is right
    				// create a token
                    const token = jwt.sign(user,config.secret,{
                        expiresIn: config.tokenExpiresIn,
                        });                    
                    
                    res.json({
                       success: true,
                       message:'User authenticated',
                       token: token,
                       user: user
                    });
    
               }           
           }
        });
        
        
    };
    
    return that;
    
})();

