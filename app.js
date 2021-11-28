// modules
const express = require("express");
const { json, urlencoded } = express;
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

const expressValidator = require("express-validator")

// app
const app = express();


// db
mongoose
    .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log("DB connected")).catch((err) => console.log("DB error ", err));

//middleware
app.use(morgan("dev"));
app.use(express.json({limit: "3mb",extended:true}));
// app.use(express.urlencoded({limit: "30mb",extended:true}));
app.use(cors({origin: true, credentials: true}));
app.use(json());
app.use(urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressValidator());

//routes

const productRoutes = require("./routes/product");
app.use("/products", productRoutes);

const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

// port
const port = process.env.PORT || 8080;

// listener
const server = app.listen(port, ()=> console.log("Server is runninggg on 8080."));