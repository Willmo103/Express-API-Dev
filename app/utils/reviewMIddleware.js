const Review = require("../models/reviews");
const { getUserTokenId } = require("./userMiddleware");

exports.checkReviewNull = async (id) => {
  try {
    const review = await Review.findOne({
      where: {
        subject: id,
      },
    });
    if (!review) {
      return false;
    }
    return true;
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

exports.reviewVerifyExists = async (id, username) => {
  try {
    const review = await Review.findOne({
      where: {
        id: id,
        owner: username,
      },
    });
    if (review) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return;
  }
};
