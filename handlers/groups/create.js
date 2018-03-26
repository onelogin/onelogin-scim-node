'use strict'

const shortid = require('shortid')
const db = require('../../db')
const scimGroup = require('../../helpers/scim-group')

module.exports = function (req, res, next) {
  console.log('CREATE Group')
  console.log(req.body)

  // Check if group name already exists
  let group = db.get('groups').find({ name: req.body.displayName }).value()

  let response, statusCode

  if(group){
    statusCode = 400
    response = {
      Errors: {
        description: 'name_already_exists',
        code: 400
      }
    }

  }else{
    // Create a new group
    group = {
      id: shortid.generate(),
      name: req.body.displayName,
      members: [],
      createdAt: new Date().toISOString(),
    }

    db.get('groups')
      .push(group)
      .write()

    statusCode = 201
    response = scimGroup(group)
  }

  console.log(response)
  res.send(statusCode, response)
  return next()
}