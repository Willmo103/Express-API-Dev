const { unauthorized, forbidden } = require("../utils/status");

const jwt = require("jsonwebtoken");

exports.authorize = (req, res, next) => {
  //   get the auth header and cut off the "Bearer"
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // check token not null
  if (!token) {
    return res.status(401).json(unauthorized());
  }
  // verify
  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) {
      return res.status(403).json(forbidden(err));
    }
    // set user and pass it
    req.user = user;
    next();
  });
};
