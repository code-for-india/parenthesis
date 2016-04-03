'use strict';

module.exports = (function(){

  const multer = require('multer');

  const storage = multer.diskStorage({
           destination :function(req,file,cb){
               cb(null,'./public/uploads');
           },
           filename : function(req,file,cb){
               cb(null,file.originalname +'-'+Date.now()+'.jpg');
           }
        });

  //defining a fileFilter
  const fileFilter = function(req, file, cb) {
    if((file.originalname).indexOf('.jpg')>=0){
      cb(null,true);
    }else{
      console.log('Error: Invalid FileType');
      cb(null,false);
    }
  };

  /*
   * Single file upload
   * An object with a of file will be stored in req.file.
   */
  const upload = multer({storage:storage, fileFilter : fileFilter}).single('userPhoto');

  return upload;

}());
