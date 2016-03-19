'use strict';

module.exports = function(app){
    const users = require('../../app/controller/users.controller'),
          feedback = require('../../app/controller/feedback.controller');
    
    app.get('/',(req,res)=>{
       res.render('index.jade'); 
    });
     
    app.post('/create',users.create);
    
    app.post('/authenticate',users.authenticate);
    
    
    //api/v2
    app.use('/api/v2/',require('./api.v2.route'));
    
    //api/v1
    app.use('/api/v1/',require('./api.v1.route'));
    
    
};
