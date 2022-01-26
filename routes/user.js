const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const User = require("../models/user");
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

// controllers
const {register, login, logout, getLoggedInUser} = require("../controllers/user")

// middlewares
const {userRegisterValidator, userById, usersAll} = require("../middlewares/user");
const {verifyToken} = require("../middlewares/auth");

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        // api_key:SENDGRID_API
    }
}))

// update user

router.put("/:id", async (req, res) => {
    try {
      const updatedProduct = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // delete user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// api routes

router.post("/register", userRegisterValidator, register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/user", verifyToken, userById, getLoggedInUser);

router.get("/users", usersAll)

router.post('/reset-password',(req,res)=> {
    crypto.randomBytes(32,(err,buffer)=>{
        if(err) {
            console.log(err)
        }
        const token = buffer.toString('hex')
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"Such user doesn't exist."})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"no-reply@genusio.com",
                    subject:"reset hesla",
                    html:`
                    <p>Obnova hesla</p>
                    <h5>kliknete na tento link <a href="http://localhost:3000/reset/${token}">link</a></h5>
                    `
                })
                res.json({message:"Email s instrukcemi poslán, zkontrolujte svoji schránku!"});
            })
        })
    })
    console.log("Request obtained");
})

module.exports = router;