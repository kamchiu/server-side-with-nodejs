const User = require('../models/user')
const jwt = require('jsonwebtoken') // used to create, sign, and verify tokens
const config = require('../config.js')

exports.getToken = function (user) {
	return jwt.sign(user, config.secretKey, {
		expiresIn: 3600
	})
}

exports.verifyOrdinaryUser = function (req, res, next) {
	// check header or url parameters or post parameters for token
	const token = req.body.token || req.query.token || req.headers['x-access-token'];

	// decode token
	if(token) {
		jwt.verify(token, config.secretKey, function(err, decoded) {
			if(err) {
				let err = new Error('you are not authenticated')
				err.status = 401;
				return next(err);
			} else {
				// if verify is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		})
	} else {
		// if there is no token, return an error
		let err = new Error('no token provived')
		err.status = 401;
		return next(err);
	}
}
