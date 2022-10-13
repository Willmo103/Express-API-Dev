exports.version = ((req, res, next) => {
    return res.status(200).json("0.0.3");
})
