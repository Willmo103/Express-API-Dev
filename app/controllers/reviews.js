const Review = require("../models/reviews");
const {
  checkReviewNull,
  buildReviewModel,
  reviewVerifyExists,
} = require("../utils/reviewMIddleware");

exports.getAll = async (req, res, next) => {
  try {
      const ALL = await Review.findAll({
          where: { owner: req.user.name }
      });
    return res.status(200).json(ALL);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    await checkReviewNull(req, res);
    const review = await Review.findOne({
      where: { id: req.params.id },
    });
    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    await reviewVerifyExists(req, res);
    const REVIEW_MODEL = await buildReviewModel(rew, res);
    const review = await Review.create(REVIEW_MODEL);
    return res.status(201).json(review);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    await checkReviewNull(req, res);
    const review = await Review.destroy({
      where: { id: req.params.id },
    });
    return res.status(200).json({ status: "Review deleted", data: review });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({
        status: "404 NOT FOUND",
        reason: `review with id: ${req.params.id} does not exist.`,
      });
    }
    try {
      const REVIEW_MODEL = {
        id: req.body.id,
        owner_id: req.body.owner_id,
        title: req.body.title,
        content: req.body.content,
        rating: req.body.rating,
        recommend: req.body.recommend,
      };

      try {
        const review = await Review.update(REVIEW_MODEL, {
          where: { id: req.params.id },
        });
        return res.status(200).json(review);
      } catch (error) {
        return res.status(500).json(error);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
