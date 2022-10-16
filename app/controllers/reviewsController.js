const Review = require("../models/reviews");
const { getUsernameFromId } = require("../utils/userMiddleware");
const {
  checkReviewNull,
  buildReviewModel,
  reviewVerifyExists,
} = require("../utils/reviewMIddleware");

exports.getAllOwnReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { owner: req.user.name },
    });
    if (!reviews) {
      return res.status(200).json({
        status: "200 - SUCCESS",
        details: `You haven't written any reviews yet.`,
      });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};

exports.getAllReviewsById = async (req, res) => {
  try {
    const username = await getUsernameFromId(req.params.id);
    try {
      const reviews = await Review.findAll({
        where: { owner: username },
      });
      if (!reviews) {
        return res.status(200).json({
          status: "200 - SUCCESS",
          details: `User '${username}' hasn't written any reviews yet.`,
        });
      }
      return res.status(200).json(reviews);
    } catch (error) {
      return res.status(500).json({
        status: "500 - INTERNAL SERVER ERROR",
        details: error,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};

exports.getAllByProductId = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: {
        subject: req.params.id,
      },
    });
    if (!reviews) {
      return res.status(200).json({
        status: "200 - SUCCESS",
        details: `No reviews for this product yet.`,
      });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};

exports.getOneReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      where: { id: req.params.id },
    });
    if (review) {
      return res.status(200).json(review);
    } else {
      return res.status(404).json({
        status: "404 - NOT FOUND",
        details: `Review with id: '${req.params.id}' does not exist.`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.createOneReview = async (req, res) => {
  try {
    if (await reviewVerifyExists(req.params.id, req.user.name)) {
      const REVIEW_MODEL = buildReviewModel(
        req.body,
        req.params.id,
        req.user.name
      );
      try {
        const review = await Review.create(REVIEW_MODEL);
        return res.status(201).json(review);
      } catch (error) {}
    } else {
      return res.status(409).json({
        status: "409 - CONFLICT",
        details: `Review already exists.`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};

exports.deleteOneReview = async (req, res) => {
  try {
    if (await checkReviewNull(req.params.id)) {
      try {
        const review = await Review.destroy({
          where: { id: req.params.id },
        });
        return res.status(200).json({ status: "Review deleted", data: review });
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.status(404).json({
        status: "404 - NOT FOUND",
        details: `Review with id: '${req.params.id}' does not exist.`,
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

exports.updateOneReview = async (req, res) => {
  try {
    if (await checkReviewNull(id)) {
      const REVIEW_MODEL = buildReviewModel(
        req.body,
        req.params.id,
        req.user.name
      );
      try {
        const review = await Review.update(REVIEW_MODEL, {
          where: { id: req.params.id },
        });
        return res.status(200).json(review);
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.status(404).json({
        status: "404 - NOT FOUND",
        reason: `review with id: '${req.params.id}' does not exist.`,
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
