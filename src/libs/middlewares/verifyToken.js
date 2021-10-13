const jwt = require("jsonwebtoken");
const config = require('../../config/');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({message: "A token is required for authentication"});
  }
  const token = req.headers.authorization.split(' ')[1]
  try {
    const decoded = jwt.verify(token, config.auth_key);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
