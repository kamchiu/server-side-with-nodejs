'use strict';

const bodyParser = require("body-parser")
const express = require("express")
const promoRouter = express.Router()
const promotions = require('../models/promotions')

promoRouter.use(bodyParser.json())

promoRouter.route('/')
.get( (req, res, next) => {
	promotions.find({}, function(err, promotion) {
		if(err) throw err;
		res.json(promotion);
	})
})
.post( (req, res, next) => {
	promotions.create(req.body, function(err, promotion) {
		if(err) throw err;
		console.log('promotion created');
		var id = promotion._id;

		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		res.end('created the promotion with the id: ' + id);
	})
})
.delete( (req, res, next) => {
	promotions.remove({}, function(err, resp) {
		if(err) throw err;
		console.log('deleted all promotions');
		res.json(resp);
	})
})

promoRouter.route('/:promoId')
.get( (req, res, next) => {
	promotions.findById(req.params.promoId, function(err, promotion) {
		if(err) throw err;
		res.json(promotion);
	})
})
.put( (req, res, next) => {
	promotions.findByIdAndUpdate(req.params.promoId, {
		$set: req.body	
	}, {
		new: true
	}, function(err, promotion) {
		if(err) throw err;
		console.log('Updated the promotion');
		res.json(promotion);
	})
})
.delete((req, res, next) => {
	promotions.findByIdAndRemove(req.params.promoId, function(err, resp) {
		if(err) throw err;
		res.json(resp);
	})
})

module.exports = promoRouter
