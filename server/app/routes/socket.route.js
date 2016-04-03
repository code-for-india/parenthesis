'use strict';

module.exports = function(io){
  const item = require('../../app/controller/item.controller');
  //new client
  io.on('connection', function (socket) {
      console.log('New client Connected!');
      item.fetchAll(function(err,result){
          if(err){
              console.log('Error');
          }
          const _data = result.map(function(value,index,array){
              var _a = value.feedback[value.feedback.length - 1];
              const temp = {
                  itemId:value.itemId,
                  city:value.city,
                  area:value.area,
                  type:value.type,
                  "feedback": _a
              }
              return temp;
          });
         console.log(_data[0]);
          io.emit('firstPush',_data);
      });
  });
};
