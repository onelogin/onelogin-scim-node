const scimUser = require("../../helpers/scim-user");
const create = require("../../puppets/create");

module.exports = async function(req, res, next) {
  console.log("CREATE User");
  console.log(req.body);

  try {
    let user = {
      id: req.body.email,
      email: req.body.email,
      givenName: req.body.name.givenName,
      familyName: req.body.name.familyName,
      createdAt: new Date().toISOString(),
      active: true
    };

    await create(user);

    let response = scimUser(user);

    console.log(response);
    res.send(201, response);
  } catch (err) {
    res.send(err)
  } finally {
    return next();
  }
};
