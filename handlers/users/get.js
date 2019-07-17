"use strict";

const scimUser = require("../../helpers/scim-user");

module.exports = async function(req, res, next) {
  console.log("GET User");
  console.log(req.params);

  res.send(204); // always fail
  return next();
};
