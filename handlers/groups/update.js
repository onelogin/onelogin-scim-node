'use strict'

module.exports = function (req, res, next) {
  console.log('UPDATE Group')
  console.log(req.params)
  console.log(req.body)

  res.send('hello')
  return next()
}