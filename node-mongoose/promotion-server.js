'use strict'

const mongoose = require('mongoose');
const assert = require('assert');

const promotions = require('./models/promotions');

const url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);

const db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection errors:'));
db.once('open', function(){
	console.log('connect correctly to the server');

	promotions.create({
		name: 'weekend Grand Buffets',
		image: 'images/buffet.jpg',
		label: 'New',
		price: 14.5,
		description: 'new buffet'
	}, function(err, promotion) {
		if(err) throw err;
		console.log('promotion created');
		console.log(promotion);

		const id = promotion._id;

		setTimeout(function() {
			promotions.findByIdAndUpdate(id, {
				image: 'iamges/grand.png',
				description: 'buffet promotion'
			}, {
				new: true
			})
			.exec(function(err, promotion) {
				if(err) throw err;
				console.log('Updated promotion');
				console.log(promotion);

				db.collection('promotions').drop(function() {
					db.close();
				})
			})
		},3000)
	})
})
