'use strict'

const db = require('../../db')
const scimUser = require('../../helpers/scim-user')
const scimCollection = require('../../helpers/scim-collection')

module.exports = function (req, res, next) {
  console.log('GET Users')
  console.log(req.query)

  // Get username filter
  const username = getUserName(req.query.filter)
  console.log(`username: ${username}`)

  let users = []

  if(username){
    users = db.get('users').filter({ username: username }).value()
  }else{
    users = db.get('users').value()
  }

  // Format users as scim
  let scimUsers = []
  for(var i=0; i<users.length; i++){
    scimUsers.push(scimUser(users[i]))
  }

  let response = scimCollection(scimUsers)

  console.log(response)
  res.send(response)
  return next()
}

function getUserName(filter){
  if(!filter) return

  let match = filter.match(/userName eq "([^"]*)"/)
  if(!match) return

  return match[1]
}