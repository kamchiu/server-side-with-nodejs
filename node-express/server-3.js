'use strict';

const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")

let hostname = 'localhost'
let port = 3000

var app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

app.all('/dishes', (req, res, next) => {
  res.writeHead(200, {"Content-Type":"text/plain"})
  next()
})

app.get('/dishes', (req, res, next) => {
  res.end('Will send you all the dishes to you!')
})

app.delete('/dishes', (req, res, next) => {
 res.end('Will delete all the dishes!') 
})

app.post('/dishes', (req, res, next) => {
  res.end('Will add the dish:' + req.body.name + 'with details: ' + req.body.description)
})

app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n')
  res.end('Will update the dish: ' + req.params.dishId)
})

app.delete('/dishes/:dishId', (req, res, next) => {
  res.end('Deleting dish: ' + req.params.dishId)
})

app.get('/dishes/:dishId', (req, res, next) => {
  res.end('Will send details of the dish: ' + body.params.dishId + 'to you!')
})

app.use(express.static(__dirname + '/resource'))

app.listen(port, hostname, () => {
  console.log('Server running at http://' + hostname + ':' + port)
})

