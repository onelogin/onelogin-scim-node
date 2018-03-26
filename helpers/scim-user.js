'use strict'

module.exports = function(user){
  return {
    schemas:[
      'urn:scim:schemas:core:1.0'
    ],
    id: user.id,
    externalId:null,
    meta:{
       created: user.createdAt,
       location: 'https://api.scimapp.com/scim/v1/Users/' + user.id
    },
    userName: user.username,
    nickName: user.givenName,
    name:{
       givenName: user.givenName,
       familyName: user.familyName
    },
    displayName: user.givenName + ' ' + user.familyName,
    profileUrl: null,
    title: null,
    timezone: null,
    active: true,
    emails:[],
    photos:[],
    groups:[]
 }
}