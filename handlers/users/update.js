'use strict'

const db = require('../../db')
const scimUser = require('../../helpers/scim-user')

module.exports = function (req, res, next) {
  console.log('UPDATE User')
  console.log(req.params)
  console.log(req.body)

  let user = db.get('users')
               .find({ id: req.params.id })
               .assign({
                username: req.body.userName,
                givenName: req.body.name.givenName,
                familyName: req.body.name.familyName,
                active: req.body.active
               })
               .write()

  console.log(user)

  let response = scimUser(user)

  console.log(response)
  res.send(response)
  return next()
}