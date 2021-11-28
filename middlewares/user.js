const User = require("../models/user");

exports.userRegisterValidator = (req,res, next) => {
    // username is not null
    req.check("username", "username is required").notEmpty();
    req.check("email", "email is required").notEmpty();
    req.check("email", "invalid email").isEmail();
    req.check("password", "password is required").notEmpty();

    // check for errors
    const errors = req.validationErrors();
    // if error, show the first one
    if (errors) {
        const firstError = errors.map((err) => err.msg)[0];

        return res.status(400).json({
            error: firstError,
        });
    }
    next();
};

exports.userById = async (req,res,next) => {
    User.findById(req._id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found",
            });

        }
        req.user = user;

        next();

    });
}

exports.usersAll = async (req,res,next) => {
    
    try {
        let users;

        users = await User.find();

        res.status(200).json(users);

    } catch (err) {
        res.status(500).json(err);
        return res.status(403).json({
            error: "Prosím přihlašte se",
        })
      }
}