const Review = require("../models/reviews");

exports.getAll = async (req, res, next) => {
  try {
    const ALL = await Review.findAll();
    return res.status(200).json(ALL);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({
        status: "failed",
        reason: `review with id: ${req.params.id} does not exist.`,
      });
    }
    try {
      const review = await Review.destroy({ where: { id: req.params.id } });
      return res.status(200).json(review);
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
