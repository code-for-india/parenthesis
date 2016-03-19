var plivo = require('plivo');
var p = plivo.RestAPI({
  authId: 'MANWVJNMUYNGQWMDLHOT',
  authToken: 'MjcyMmUxOGU3MzExODAzZWRiYzc1ZTY5ZDg1Y2Iz'
});
 
var params = {
    'src': '1111111111', // Sender's phone number with country code
    'dst' : '2222222222', // Receiver's phone Number with country code
    'text' : "Hi, message from Plivo" // Your SMS Text Message - English
};

// Prints the complete response
p.send_message(params, function (status, response) {
    console.log('Status: ', status);
    console.log('API Response:\n', response);
});