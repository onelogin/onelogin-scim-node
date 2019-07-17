const scimUser = require("../../helpers/scim-user");
const scimCollection = require("../../helpers/scim-collection");

module.exports = function(req, res, next) {
  console.log("GET Users");
  console.log(req.query);

  // Format users as scim
  let scimUsers = [];
  let response = scimCollection(scimUsers);

  console.log(response);
  res.send(response);
  return next();
};

