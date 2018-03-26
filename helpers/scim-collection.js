'use strict'

module.exports = function(items){
  return {
    totalResults: items.length,
    startIndex: 1,
    schemas: [
      'urn:scim:schemas:core:1.0'
    ],
    Resources: items
  }
}