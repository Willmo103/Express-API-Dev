// exports.createToken = async (req, res, email, password) => {};
const Op = require("sequelize");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.authorize = (req, res, next) => {
  //   get the auth header and cut off the "Bearer"
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // check token not null
  if (!token) {
    return res.status(401).json({
      status: "401 - UNAUTHORIZED ACCESS",
      reason: `Not authorized. Please Login.`,
    });
  }
  // verify
  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        status: "403 - FORBIDDEN",
        reason: `Not authorized. Please Login.`,
      });
    }
    // set user and pass it
    req.user = user;
    next();
  });
};

exports.loginUser = async (req, res) => {
  try {
    //   look for either username or email in body
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: req.body.email }, { username: req.body.username }],
      },
    });
    try {
      // compare the req password with the hashed database password
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        //   generate jwt from username
        const token = jwt.sign(
          {
            name: user.username,
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: process.env.EXPIRE_TIME,
          }
        );
        // return token
        return res.status(200).json({
          status: "Success",
          "token-type": "Bearer",
          token: token,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        status: "400 - BAD REQUEST",
        reason: "Invalid credentials. Unable to login",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
