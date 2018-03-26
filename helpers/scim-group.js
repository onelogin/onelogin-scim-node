'use strict'

module.exports = function(group){
  return {
    schemas:[
       'urn:scim:schemas:core:1.0'
    ],
    id: group.id,
    displayName: group.name,
    members: group.members,
    meta:{
       created: group.createdAt
    }
  }
}