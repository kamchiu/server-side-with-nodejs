'use strict';

const bodyParser = require("body-parser")
const express = require("express")
const promoRouter = express.Router()

promoRouter.use(bodyParser.json())

promoRouter.route('/')
.all( (req, res, next) => {
  res.writeHead(200, {"Content-Type": "text/plain"})
  next()
})
.get( (req, res, next) => {
  res.end("Will send you all the promotioins!")
})
.post( (req, res, next) => {
  res.end('Will add the promotion: ' + req.body.name + ' with details ' + req.body.description)
})
.delete( (req, res, next) => {
  res.end('Delete all the promotions...')
})

promoRouter.route('/:promoId')
.all( (req, res, next) => {
  res.writeHead(200, {"Content-Type": "text/plain"})
  next()
})
.get( (req, res, next) => {
  res.end("Will send you promotion: " + req.params.promoId)
})
.put( (req, res, next) => {
  res.wirte("updating promotion: " + req.params.promoId + '\n')
  res.end("Will update the promotion: " + req.body.name + ' with details ' + req.body.description)
})
.delete((req, res, next) => {
  res.end('Will delete promotion: ' + req.params.promoId)
})

module.exports = promoRouter
