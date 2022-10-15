const Review = require("../models/reviews");

exports.checkReviewNull = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({
        status: "404 - NOT FOUND",
        reason: `review with id: ${req.params.id} does not exist.`,
      });
    }
    next;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.buildReviewModel = (req, res) => {
  try {
    const REVIEW_MODEL = {
      id: req.body.id,
      owner: req.user.name,
      title: req.body.title,
      content: req.body.content,
      rating: req.body.rating,
      recommend: req.body.recommend,
    };
    return REVIEW_MODEL;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.reviewVerifyExists = async (req, res, next) => {
  try {
    const review = await Review.findOne({
      where: { name: req.body.name },
    });
    if (review) {
      return res.status(409).json({
        status: "409 - CONFLICT",
        reason: `review with id: ${req.body.name} already exists.`,
      });
    }
    next;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
