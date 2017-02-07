'use strict'

const http = require("http")

let hostname = 'localhost'
let port = 3000

var server = http.createServer((req, res) => {
  console.log(req.headers)
  
  res.writeHead(200, { 'Content-Type': 'text/html'})
  res.end('<html><body>HELLO NODEJS</body></html>')
  })

server.listen(port, hostname, function() {
})
