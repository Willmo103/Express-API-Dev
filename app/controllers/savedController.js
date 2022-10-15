const Saved = require("../models/savedProducts");
const { getUsernameFromId } = require("../utils/userMiddleware");

exports.userGetAllOwn = async (req, res) => {
  try {
    const savedProducts = await Saved.findAll({
      where: {
        owner: req.user.name,
      },
    });
    return res.status(200).json(savedProducts);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllByUserId = async (req, res) => {
  try {
    const username = await getUsernameFromId(req, res);
    try {
      const savedProducts = await Saved.findAll({
        where: {
          owner: username,
        },
      });
      return res.status(200).json(savedProducts);
    } catch {}
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const savedProduct = await Saved.findOne({
      where: {
        owner: req.user.name,
      },
    });
    return res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.saveOne = async (req, res) => {
  const SAVE_MODEL = {
    owner: req.user.name,
    product: req.body.product,
  };
  try {
    const save = await Saved.create(SAVE_MODEL);
    return res.status(200).json({ status: "Product saved.", data: save });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const save = await Saved.destroy({
      where: {
        id: req.params.id,
        owner: req.user.name,
      },
    });
    return res.status(200).json({ status: "Product deleted.", data: save });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
