'use strict'

const express = require("express")
const bodyParser = require("body-parser")

const mongoose = require('mongoose')
const leaderships = require('../models/leaders')

const leaderRouter = express.Router()
leaderRouter.use(bodyParser.json())

leaderRouter.route('/')
.get( (req, res, next) => {
	leaderships.find({}, function(err, leadership) {
		if(err) throw err;
		res.json(leadership);
	})
})
.delete( (req, res, next) => {
	leaderships.remove({}, function(err, resp) {
		if(err) throw err;
		res.json(resp);
	})
})
.post( (req, res, next) => {
	leaderships.create(req.body, function(err, leadership) {
		if(err) throw err;
		const id = leadership._id;

		res.writeHead(200, {'Content-Type': 'text/plain'})
		res.end('Created leadership with id: ' + id)
	})
})

leaderRouter.route('/:leaderId')
.get( (req, res, next) => {
	leaderships.findById(req.params.leaderId, function(err, leadership) {
		if(err) throw err;
		res.json(leadership);
	})
})
.delete( (req, res, next) => {
	leaderships.findByIdAndRemove(req.params.leaderId, function(err, resp) {
		if(err) throw err;
		res.json(resp);
	})
})
.put( (req, res, next) => {
	leaderships.findByIdAndUpdate(req.params.leaderId, {
		$set: req.body
	}, {
		new: true
	}, function(err, leadership) {
		if(err) throw err;
		res.json(leadership);
	})
})

module.exports = leaderRouter
