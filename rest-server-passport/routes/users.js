const express = require('express');
const router = express.Router();
const passport = require('passport')
const User = require('../models/user')
const Verify = require('./verify')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {
	User.register(new User({ username: req.body.username }),
	  req.body.password, (err, user) => {
	  	if(err) {
			return res.status(500).json({err: err})
		}
		passport.authenticate('local')(req, res,
		  () => res.status(200).json({ stauts: 'registration successful'}))
	  })
})

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if(err) {
			return next(err);
		}
		if(!user) {
			return res.status(401).json({
				err: 'could not log in user'
			})
		}
		req.logIn(user, (err) => {
			if(err) {
				return res.status(500).json({ err: 'could not log in user'})
			}

				
			const token = Verify.getToken(user)
			res.status(200).json({
				status: 'login successful',
				success: true,
				token: token
			})
		})

	})(req, res, next);
})

router.get('/logout', (req, res) => {
	req.logout();
	res.status(200).json({
		status: 'bye'
	})
})

module.exports = router;
