const Review = require("../../models/reviews");

exports.getAll = async (req, res, next) => {
  try {
    const review = await Review.findAll();
    return res.status(200).json(review);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({
        status: "404 - NOT FOUND",
        details: `review with id: '${req.params.id}' does not exist.`,
      });
    }
    try {
      const review = await Review.destroy({ where: { id: req.params.id } });
      return res.status(204).json({
        status: "204 - NO CONTENT",
        details: `Review with id '${req.params.id}' deleted.`,
        data: review,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "500 - INTERNAL SERVER ERROR",
        details: error,
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
