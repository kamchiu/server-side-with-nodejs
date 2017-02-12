'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

// create a schema 

const dishSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	comments: [commentSchema]
}, {
	timestamps: true
});

// the schema is useless so far
// we need to create a model using it

const Dishes = mongoose.model('Dish', dishSchema);

// make this avialable to our Node applications
module.exports = Dishes;
