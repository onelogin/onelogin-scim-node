'use strict'

const db = require('../../db')

module.exports = function (req, res, next) {
  console.log('DELETE User')
  console.log(req.params)

  db.get('users').remove({ id: req.params.id }).write()

  res.send(200)
  return next()
}