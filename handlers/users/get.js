'use strict'

const db = require('../../db')
const scimUser = require('../../helpers/scim-user')

module.exports = function (req, res, next) {
  console.log('GET User')
  console.log(req.params)

  let user = db.get('users')
               .find({ id: req.params.id })
               .value()

  if(user){
    let response = scimUser(user)
    console.log(response)
    res.send(response)
  }else{
    res.send(404) // Not Found
  }

  return next()
}