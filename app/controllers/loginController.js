const { compare } = require("bcrypt");
const User = require("../models/users");
const sign = require("jsonwebtoken").sign;
exports.loginUser = async (req, res) => {
  try {
    //   look for either username or email in body
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    try {
      // compare the req password with the hashed database password
      const match = await compare(req.body.password, user.password);
      if (match) {
        //   generate jwt from username
        const token = sign(
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
          status: "200 - SUCCESS",
          "token-type": "Bearer",
          token: token,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        status: "400 - BAD REQUEST",
        details: "Invalid credentials. Unable to login",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};
