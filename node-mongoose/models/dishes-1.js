'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var dishSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	}
},{
	timestamps: true
})

// the schema is ulseless so far
// we need to create a model to using it

var Dishes = mongoose.model('Dish', dishSchema)

// make this available to our node applications
module.exports = Dishes
