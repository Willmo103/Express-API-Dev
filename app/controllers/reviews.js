const Review = require("../models/reviews");
const { getUsernameFromId } = require("../utils/userMiddleware");
const {
  checkReviewNull,
  buildReviewModel,
  reviewVerifyExists,
} = require("../utils/reviewMIddleware");

exports.getAllOwn = async (req, res) => {
  try {
    const ALL = await Review.findAll({
      where: { owner: req.user.name },
    });
    return res.status(200).json(ALL);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAllById = async (req, res) => {
  try {
    const username = getUsernameFromId(req, res);
    const ALL = await Review.findAll({
      where: { owner: username },
    });
    return res.status(200).json(ALL);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getOne = async (req, res) => {
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

exports.createOne = async (req, res) => {
  try {
    await checkReviewNull(req, res);
    const REVIEW_MODEL = await buildReviewModel(rew, res);
    const review = await Review.create(REVIEW_MODEL);
    return res.status(201).json(review);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteOne = async (req, res) => {
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

exports.updateOne = async (req, res) => {
  try {
    await reviewVerifyExists(req, res);
    const REVIEW_MODEL = await buildReviewModel(rew, res);
    const review = await Review.update(REVIEW_MODEL, {
      where: { id: req.params.id },
    });
    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json(error);
  }
};
