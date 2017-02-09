const express = require("express")
const bodyParser = require("body-parser")
const dishRouter = express.Router()

dishRouter.use(bodyParser.json())
dishRouter.route('/')
.all( (req, res, next) => {
    res.writeHead(200, {"Content-Type":"text/plain"})
    next()
})
.get( (req, res, next) => {
    res.end('Will send you all the dishes to you!')
})
.post( (req, res, next) => {
    res.end('Will add the dish:' + req.body.name + 'with details: ' + req.body.description)
})
.put( (req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n')
    res.end('Will update the dish: ' + req.params.dishId)
})
.delete( (req, res, next) => {
    res.end('Delete all the dishes!')
})


dishRouter.route('/:dishId')
.all( (req, res, next) => {
   res.writeHead(200, {"Content-Type": "text/plain"})
   next()
})
.get( (req, res, next) => {
    res.end('Will send details of the dish:' + req.params.dishId)
})
.delete( (req, res, next) => {
   res.end('Deleting dish:' + req.params.dishId)
})
.put( (req, res, next) => {
  res.write('Updating ths dish: ' + req.params.dishId + '\n')
  res.end('Will update the dish: ' + req.body.name + ' with details ' + req.body.description)

})

module.exports = dishRouter

