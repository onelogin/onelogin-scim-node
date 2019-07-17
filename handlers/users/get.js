"use strict";

const scimUser = require("../../helpers/scim-user");
const get = require("../../puppets/get");

module.exports = async function(req, res, next) {
  console.log("GET User");
  console.log(req.params);

  try {
    const result = await get();
    console.log(result);

    const response = scimUser();

    res.send(response);
  } catch (err) {
    res.send(err);
  } finally {
    return next();
  }
};
