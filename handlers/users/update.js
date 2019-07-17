const scimUser = require('../../helpers/scim-user')

module.exports = function (req, res, next) {
  console.log('UPDATE User')
  console.log(req.params)
  console.log(req.body)

  res.send(204); // always fail
  return next()
}