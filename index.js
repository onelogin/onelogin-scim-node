'use strict'

const restify = require('restify')
const errors = require('restify-errors')
const handlers = require('./handlers')

var server = restify.createServer()

server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.authorizationParser())

// Authorization Header - Bearer token validation
server.use(function (req, res, next) {
  if(req.authorization.scheme != 'Bearer' || req.authorization.credentials != ''){
    console.log('NOT AUTHORIZED')
    return next(new errors.InvalidCredentialsError('Check bearer token matches OneLogin SCIM app'))
  }

  return next()
})

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