'use strict';

module.exports = (function(){
    
    var express = require('express');
    var apiRoutes = express.Router();
   
    const item = require('../../app/controller/item.controller'),
          feedback = require('../../app/controller/feedback.controller'),
          auth = require('../../middleware/auth.middleware');
    
  
    apiRoutes.use(auth);
    
    //apiRoutes.all('/check',index.getInfo);
    
    /*
     * Item routes
     */
     
    //POST
    apiRoutes.post('/item/add',item.add);
    apiRoutes.post('/item/update',item.update);
    
    //GET
    apiRoutes.get('/item/delete/:itemId',item.delete);
    
    apiRoutes.get('/item/searchAll',item.fetch);
    apiRoutes.get('/item/searchById/:itemId',item.fetchById);
    apiRoutes.get('/item/searchByCity/:city',item.fetchByCity);
    
     
    /*
     * Feedback routes
     */
    
    //GET
    apiRoutes.get('/feedback/searchById/:itemId',feedback.fetchById);
    apiRoutes.get('/feedback/delete/',feedback.delete);
    
    
    
    return apiRoutes;
    
    
})();