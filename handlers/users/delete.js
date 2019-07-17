module.exports = function(req, res, next) {
  console.log("DELETE User");
  console.log(req.params);

  // fake for now

  res.send(200);
  return next();
};
