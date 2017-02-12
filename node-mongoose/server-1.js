'use strict'

var mongoose = require('mongoose')
var assert = require('assert')

var Dishes = require('./models/dishes-1')

var url = 'mongodb://localhost:27017/conFusion'
mongoose.connect(url)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
	console.log('Connected correctly to server')

	// create a new user
	var newDish = Dishes({
		name: 'kam',
		description: 'test'
	})

	// save the user
	newDish.save(function(err) {
		if(err) {
			throw err;
		}
		console.log('Dish created!')

		// get all the users
		Dishes.find({}, function(err, dishes) {
			if(err) throw err;

			//object of all the users
			console.log(dishes)
			
			db.collection('dishes').drop(function() {
				db.close()
			})
		})
	})
})
