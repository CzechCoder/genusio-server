const express = require("express");
const router = express.Router();

// controllers
const {register, login, logout, getLoggedInUser} = require("../controllers/user")

// middlewares
const {userRegisterValidator, userById, usersAll} = require("../middlewares/user");
const {verifyToken} = require("../middlewares/auth");

// api routes
router.post("/register", userRegisterValidator, register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/user", verifyToken, userById, getLoggedInUser);

router.get("/users", usersAll)

module.exports = router;