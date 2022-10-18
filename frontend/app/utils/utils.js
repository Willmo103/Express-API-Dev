const { compare, hash } = require("bcrypt");
const User = require("../models/users");

exports.checkHashedPassword = async (reqPassword, storedPassword) => {
  try {
    const validPassword = await compare(reqPassword, storedPassword);
    return validPassword;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.hashPassword = async (password) => {
  try {
    const encryptedPassword = await hash(password, 10);
    return encryptedPassword;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.buildProductModel = (body = {}) => {
  try {
    const PRODUCT_MODEL = {
      name: body.name,
      price: body.price,
      salesPrice: body.salesPrice,
      cost: body.cost,
      imageUrl: body.imageUrl,
      description: body.description,
      quantity: body.quantity,
    };
    return PRODUCT_MODEL;
  } catch (error) {
    console.log(error);
    return;
  }
};

exports.buildNewUserModel = async (body = {}) => {
  try {
    const hashed = await this.hashPassword(body.password);
    const USER_MODEL = {
      username: body.username,
      email: body.email,
      password: hashed,
      firstName: body.firstName,
      lastName: body.lastName,
      address: body.address,
      shippingAddress: body.shippingAddress,
      bio: body.bio,
      subtitle: body.subtitle,
    };
    return USER_MODEL;
  } catch (error) {
    console.log(error);
    return;
  }
};

exports.buildReviewModel = (body = {}, id, username) => {
  try {
    const REVIEW_MODEL = {
      owner: username,
      subject: id,
      title: body.title,
      content: body.content,
      rating: body.rating,
      recommend: body.recommend,
    };
    return REVIEW_MODEL;
  } catch (error) {
    console.log(error);
    return;
  }
};

exports.getUsernameFromId = async (id) => {
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    return user.username;
  } catch (error) {
    console.log(error);
    return;
  }
};
