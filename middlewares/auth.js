const jwt = require("jsonwebtoken");

exports.verifyToken = (req,res, next) => {
    let accessToken = req.cookies.jwt;;

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
            error: "Unauthorized"
        });
    }
}