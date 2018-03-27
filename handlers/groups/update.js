'use strict'

const db = require('../../db')

module.exports = function (req, res, next) {
  console.log('UPDATE Group')
  console.log(req.params)
  console.log(req.body)

  let members = req.body.members || []

  // Find the group
  let group = db.get('groups').find({ id: req.params.id }).value()

  // Add/Remove Members
  for(var i=0; i<members.length; i++){
    let groupId = members[i].value

    switch(members[i].operation){
      case 'add':
        if(!group.members.includes(groupId)){
          group.members.push(groupId)
        }
        break

      case 'delete':
        group.members = group.members.filter(id => id !== groupId)
        break
    }
  }

  // Update the group
  db.get('groups')
    .find({ id: req.params.id })
    .assign({
      members: group.members
    })
    .write()

  res.send(200)
  return next()
}