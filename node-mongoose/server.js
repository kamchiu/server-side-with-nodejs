'use strict'

const mongoose = require('mongoose');
const assert = require('assert');

const Dishes = require('./models/dishes');

const url = `mongodb://localhost:27017/conFusion`;
mongoose.connect(url);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connected correctly to server');

	// create a new dish
	Dishes.create({
		name: 'javascript',
		image: 'logo.svg',
		category: 'mains',
		label: 'Hot',
		price: '4.99',
		description: 'test',
		comments: [
			{
				rating: 3,
				comment: 'this is great!',
				author: 'Jackson'
			}
		]
	}, function(err, dish) {
		if(err) throw err;
		console.log('Dish created!');
		console.log(dish);

		let id = dish._id;

		//get all dishes
		setTimeout(function() {
			Dishes.findByIdAndUpdate(id, {
				$set: {
					label: 'normal',
					price: '9.99',
					description: 'update test'
				}
			}, {
				new: true
			})
			.exec(function(err, dish) {
				if(err) throw err;
				console.log('updated Dish!');
				console.log(dish);

				dish.comments.push({
					rating: 5,
					comment: 'I am feeling so high!',
					author: 'Leo'
				});
				
				dish.save(function(err, dish) {
					console.log('updated comments');
					console.log(dish);

					db.collection('dishes').drop(function() {
						db.close();
					})
				})
			})
		}, 3000)
	})
})
