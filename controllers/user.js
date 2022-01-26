const User = require("../models/user");
const jwt = require("jsonwebtoken");
require('dotenv').config();


// register function
exports.register = async (req, res) => {
// check if user exists
const usernameExists = await User.findOne({
    username: req.body.username,
    
});
const emailExists = await User.findOne({
    email: req.body.email,
});

if (usernameExists) {
    return res.status(403).json({
        error: "Uživatel existuje"
    });
}
if (emailExists) {
    return res.status(403).json({
        error: "Email existuje"
    });
}


// create a new user

const user = new User(req.body);
await user.save();

res.status(201).json({
    message: "Registrace hotova!"
});

};

// login function
exports.login = async(req,res) => {
    // find the user w/ email
    const {email, password} = req.body;

    await User.findOne({email}).exec((err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: "Neplatné údaje"
            });
        }
        // if found, use auth method
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Špatný email nebo heslo",
            });
        }
// generate token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "24d",
    });
    // presists token
    res.cookie("jwt", token, {expire: new Date() + 9999, httpOnly: true})
// return the response
const {username} = user;

return res.json({
        message: `${username} přihlášen!!`,
        username,
        user,
        });
    });
};

exports.logout = (req,res) => {
    // clear cookie
    res.clearCookie("jwt");

    return res.json({
        message: "Odhlášení úspěšné",
    });
};

exports.getLoggedInUser = (req,res) => {
    const { username } = req.user;
    return res.status(200).json({
        message: "Uživatel je stále zalogován", username,
    })
}