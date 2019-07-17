"use strict";

const shortid = require("shortid");
const db = require("../../db");
const scimUser = require("../../helpers/scim-user");

module.exports = function(req, res, next) {
  console.log("CREATE User");
  console.log(req.body);

  try {
    let user = {
      id: shortid.generate(),
      username: req.body.userName,
      email: req.body.email,
      givenName: req.body.name.givenName,
      familyName: req.body.name.familyName,
      createdAt: new Date().toISOString(),
      active: true
    };

    db.get("users")
      .push(user)
      .write();

    let response = scimUser(user);

    console.log(response);
    res.send(201, response);
  } catch (err) {
    res.send(err)
  } finally {
    return next();
  }
};
