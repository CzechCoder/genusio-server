const jwt = require("jsonwebtoken");

exports.verifyToken = (req,res, next) => {
    // receives token as a part of the request
    let accessToken = req.headers['authorization'];

    // if there is no token, request not auth'd
    if (!accessToken) {
        return res.status(403).json({
            error: "Prosím přihlašte se",
        });
    }

    let payload;
    try {
            payload = jwt.verify(accessToken, process.env.JWT_SECRET);
            req._id = payload._id;

            next();
    } catch(e) {
        return res.status(403).json({
            error: "Unauthorized",
        });
    }
}