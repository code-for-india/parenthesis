'use strict';

module.exports = function(req,res,next){
    const jwt = require('jsonwebtoken');
    const config = require('../config/config'); 
    
    // check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    // decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, config.secret, function(err, decoded) {			
			if (err) {
				return res.status(401).json({ success: 3, message: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: 3, 
			message: 'No token provided.'
		});
        		
	}
	    
};