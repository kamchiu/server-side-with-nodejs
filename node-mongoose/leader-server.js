'use strict'

const mongoose = require('mongoose');
const assert = require('assert');

const leaderships = require('./models/leaders');

const url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connnection arrors:'));
db.once('open', function() {
	console.log('connect correctly to the server');

	leaderships.create({
		name: 'peat',
		image: 'images/peter.jpg',
		designation: 'chief Epicurious officer',
		abbr: 'CEO',
		description: 'our CEO'
	}, function(err, leadership) {
		if(err) throw err;
		console.log('leadership created');
		console.log(leadership);

		const id = leadership._id;

		setTimeout(function() {
			leaderships.findByIdAndUpdate(id, {
				name: 'Jeff Dean',
				description: 'great CEO'
			}, {
				new: true
			})
			.exec(function(err, leadership) {
				if(err) throw err;
				console.log('updated leadership');
				console.log(leadership);

				db.collection('leadership').drop(function() {
					db.close();
				})
			})
		}, 3000)
	});
})
