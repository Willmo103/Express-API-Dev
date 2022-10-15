exports.version = (req, res, next) => {
  return res.status(200).json({ API_version: "0.0.6" });
};
