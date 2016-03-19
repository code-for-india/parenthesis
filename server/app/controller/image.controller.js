//var express =   require("express");
var multer  =   require('multer');
//var app         =   express();
module.exports= (function(){
   const config = require('../../config/config'),
   that={};
    var storage =   multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, './public/uploads');
      },
      filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
      }
});
var upload = multer({ storage : storage}).single('userPhoto');
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

