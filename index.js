'use strict'

const restify = require('restify')
const handlers = require('./handlers')

var server = restify.createServer()

server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

// Users
server.get('/Users', handlers.users.list)
server.get('/Users/:id', handlers.users.get)
server.post('/Users', handlers.users.create)
server.put('/Users/:id', handlers.users.update)
server.del('/Users/:id', handlers.users.delete)

// Groups
server.get('/Groups', handlers.groups.list)
server.post('/Groups', handlers.groups.create)
server.patch('/Groups/:id', handlers.groups.update)

// Default
server.get('/', function (req, res, next) {
  res.send('OneLogin SCIM Sample')
  return next()
})

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url)
})