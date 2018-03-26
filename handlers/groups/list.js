'use strict'

const db = require('../../db')
const scimGroup = require('../../helpers/scim-group')
const scimCollection = require('../../helpers/scim-collection')

module.exports = function (req, res, next) {
  console.log('GET Groups')
  console.log(req.query)

  // Get Groups
  let groups = db.get('groups').value()
  let scimGroups = []

  // Add groups to the scim formatted response
  if(groups){
    for(var i=0; i<groups.length; i++){
      scimGroups.push(scimGroup(groups[i]))
    }
  }

  let response = scimCollection(scimGroups)

  console.log(response)
  res.send(response)
  return next()
}

