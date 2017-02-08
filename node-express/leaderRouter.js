'use strict'

const express = require("express")
const bodyParser = require("body-parser")
const leaderRouter = express.Router()

leaderRouter.use(bodyParser.json())

leaderRouter.route('/')
.all( (req, res, next) => {
  res.writeHead(200, {"Content-Type": "text/plain"})
  next()
})
.get( (req, res, next) => {
  res.end("Will send all leaders for you!")
})
.delete( (req, res, next) => {
  res.end("Delete all leaders!!!")
})
.post( (req, res, next) => {
  res.end("Adding new leader:" + req.body.name + " with details: " + req.body.description) 
})

leaderRouter.route('/:leaderId')
.all((req, res, next) => {
  res.writeHead(200, {"Content-Type": "text/plain"})
  next()
})
.get( (req, res, next) => {
  res.end('Sending you the leadership: ' + req.params.leaderId)
})
.delete( (req, res, next) => {
  res.end('delete the leadership: ' + req.params.leaderId)
})
.put( (req, res, next) => {
  res.write('updating the leadership: ' + req.params.leaderId)
  res.end("Update the leadership: " + req.body.name + " with details " + req.body.description)
})

module.exports = leaderRouter
