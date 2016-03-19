'use strict';

module.exports = (function(){
        
    var that = {};
    
    that.getInfo = function(req,res){
        res.json({
           success:true,
           message:'This is info content, '+
           'only accessable to authenticated users.',
           user:req.decoded 
        });
    };    
    
    return that;
    
})();
