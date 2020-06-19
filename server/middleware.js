let jwt = require('jsonwebtoken');
const config = require('./config');

let checkToken = (req, res, next) => {
  let token = req.body["access_token"];
  if (!token) return res.status(400).json({
    message: `Field access_token is missing`,
    location: "body"
  });

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) return res.status(401).json({
      message: 'Access_token is not valid'
    });
    req.decoded = decoded;
  });

  next();
};

module.exports = {
  checkToken: checkToken
}
