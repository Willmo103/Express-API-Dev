const Review = require("../models/reviews");
const { buildReviewModel, getUsernameFromId } = require("../utils/utils");
const {
  serverError,
  empty,
  success,
  notFound,
  conflict,
  deleted,
  created,
} = require("../utils/status");
const Product = require("../models/products");

exports.getAllOwnReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { owner: req.user.name },
    });
    if (!reviews) {
      return res.status(200).json(empty("reviews"));
    }
    return res.status(200).json(success(reviews));
  } catch (error) {
    return res.status(500).json(serverError(error));
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
        return res.status(200).json(empty("reviews"));
      }
      return res.status(200).json(success(reviews));
    } catch (error) {
      return res.status(500).json(serverError(error));
    }
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};

exports.getAllByProductId = async (req, res) => {
  try {
    const verifyProduct = await Product.findOne({
      where: { id: req.params.id },
    });
    if (!verifyProduct) {
      return res.status(404).json(notFound(`product with id '${req.params.id}'`));
    }
    const reviews = await Review.findAll({
      where: {
        subject: req.params.id,
      },
    });
    if (!reviews) {
      return res.status(200).json(empty(reviews));
    }
    return res.status(200).json(success(reviews));
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};

exports.getOneReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      where: { id: req.params.id },
    });
    if (!review) {
      return res
        .status(404)
        .json(notFound(`review with id '${req.params.id}'`));
    }
    return res.status(200).json(success(review));
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};

exports.createOneReview = async (req, res) => {
  try {
    const verifyProduct = await Product.findOne({
      where: { id: req.params.id },
    });
    if (!verifyProduct) {
      return res
        .status(404)
        .json(notFound(`product with id '${req.params.id}'`));
    }
    try {
      const review = await Review.findOne({
        where: { subject: req.params.id, owner: req.user.name },
      });
      if (review) {
        return res
          .status(409)
          .json(conflict(`product with id '${req.params.id}'`));
      }
      const REVIEW_MODEL = buildReviewModel(
        req.body,
        req.params.id,
        req.user.name
      );
      try {
        const review = await Review.create(REVIEW_MODEL);
        return res.status(201).json(created(review));
      } catch (error) {
        return res.status(500).json(serverError(error));
      }
    } catch (error) {
      return res.status(500).json(serverError(error));
    }
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};

exports.deleteOneReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      where: {
        subject: req.params.id,
        owner: req.user.name,
      },
    });
    if (!review) {
      return res
        .status(404)
        .json(
          notFound(
            `the review by ${req.user.name}for product with id '${req.params.id}'`
          )
        );
    }
    try {
      const review = await Review.destroy({
        where: {
          subject: req.params.id,
          owner: req.user.name,
        },
      });
      return res
        .status(204)
        .json(deleted(`review with id '${req.params.id}'`));
    } catch (error) {
      return res.status(500).json(serverError(error));
    }
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};

exports.updateOneReview = async (req, res) => {
  try {
    const verifyProduct = await Product.findOne({
      where: { id: req.params.id },
    });
    if (!verifyProduct) {
      return res
        .status(404)
        .json(notFound(`product with id '${req.params.id}'`));
    }
    try {
      const review = await Review.findOne({
        where: {
          subject: req.params.id,
          owner: req.user.name,
        },
      });
      if (!review) {
        return res
          .status(409)
          .json(notFound(`${req.user.name}'s review for product with id '${req.params.id}'`));
      }
      try {
        const REVIEW_MODEL = buildReviewModel(
          req.body,
          req.params.id,
          req.user.name
        );
        try {
          const review = await Review.update(REVIEW_MODEL, {
            where: { subject: req.params.id, owner: req.user.name },
          });
          return res.status(200).json(success(review));
        } catch (error) {
          return res.status(500).json(serverError(error));
        }
      } catch (error) {
        return res.status(500).json(serverError(error));
      }
    } catch (error) {
      return res.status(500).json(serverError(error));
    }
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};
