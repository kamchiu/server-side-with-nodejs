'use strict'

const mongoose = require('mongoose');
const assert = require('assert');

let Dishes = require('./models/dishes-1');

const url = `mongodb://localhost:27017/conFusion`;
mongoose.connect(url);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connected correctly to server');

	// create a new dish
	Dishes.create({
		name: 'kam',
		description: 'test'
	}, function(err, dish) {
		if(err) throw err;
		console.log('Dish created!');
		console.log(dish);

		let id = dish._id;

		//get all dishes
		setTimeout(function() {
			Dishes.findByIdAndUpdate(id, {
				$set: {
					description: 'update test'
				}
			}, {
				new: true
			})
			.exec(function(err, dish) {
				if(err) throw err;
				console.log('updated Dish!');
				console.log(dish);

				db.collection('dishes').drop(function() {
					db.close();
				})
			})
		}, 3000)
	})
})
