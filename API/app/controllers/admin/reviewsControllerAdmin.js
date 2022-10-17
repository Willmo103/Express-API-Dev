const Review = require("../../models/reviews");
const {
  serverError,
  success,
  notFound,
  deleted,
} = require("../../utils/status");

exports.getAll = async (req, res, next) => {
  try {
    const review = await Review.findAll();
    return res.status(200).json(success(review));
  } catch (error) {
    console.log(error);
    return res.status(500).json(serverError(error));
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json(notFound("review"));
    }
    try {
      const review = await Review.destroy({ where: { id: req.params.id } });
      return res.status(204).json(deleted(review));
    } catch (error) {
      return res.status(500).json(serverError(error));
    }
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};
