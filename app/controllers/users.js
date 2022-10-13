const User = require("../models/users");

exports.getAll = async (req, res, next) => {
    try {
        const ALL = await User.findAll()
        return res.status(200).json(ALL)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        return res.status(200).json(User)
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.createOne = async (req, res, next) => {
    try {
        const USER_MODEL = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.user.address,
            shippingAddress: req.user.shippingAddress
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.deleteOne = async (req, res, next) => {
    try {
        const user = await user.destroy({ where: { id: req.params.id } })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}

exports.updateOne = async (req, res, next) => {
    try {
        const USER_MODEL = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          address: req.user.address,
          shippingAddress: req.user.shippingAddress,
        };

        try {
            const user = await User.update(USER_MODEL, {where: { id: req.params.id }})
            return res.status(200).json(user)
        } catch (error) {}
    } catch (error) {
        return res.status(500).json(error)
    }
}