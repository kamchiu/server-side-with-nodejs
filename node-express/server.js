'use strict';

const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const dishRouter = require("./dishRouter")
const promoRouter = require("./promoRouter")
const leaderRouter = require("./leaderRouter")

let hostname = 'localhost'
let port = 3000

const app = express()

app.use(morgan('dev'))

app.use('/dishes', dishRouter)
app.use('/promotions', promoRouter)
app.use('/leaderships', leaderRouter)

app.use(express.static(__dirname + '/resource'))

app.listen(port, hostname, () => {
  console.log('Server running at http://' + hostname + ':' + port)
})
