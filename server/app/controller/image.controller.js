//var express =   require("express");
var multer  =   require('multer');
//var app         =   express();
module.exports= (function(){

   //upload file module added
   const upload = require('../../middleware/uploadFile'),
         that={};

 that.add = (req,res,next) =>{
 upload(req,res,function(err) {
        if(err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
 }
  return that;
})();
