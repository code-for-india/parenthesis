'use strict';

module.exports = (function(){
    
    var express = require('express');
    var apiRoutes = express.Router();
   
    const item = require('../../app/controller/item.controller'),
          feedback = require('../../app/controller/feedback.controller'),
          image=require('../../app/controller/image.controller'),
          auth = require('../../middleware/auth.middleware');
    
    //POST 
    apiRoutes.post('/photo',image.add);
    apiRoutes.post('/feedback/add',feedback.add);
    
    apiRoutes.get('/item/searchAll',item.fetch);
    apiRoutes.get('/item/searchById/:itemId',item.fetchById);
    apiRoutes.get('/item/searchByCity/:city',item.fetchByCity);
    apiRoutes.get('/feedback/top',feedback.findInOneDay);
    
    apiRoutes.get('/item/rating',item.rating);
    
    return apiRoutes;
    
    
})();