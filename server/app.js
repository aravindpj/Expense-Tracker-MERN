const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const routers=require('./allRoutes')
const connect = require("./database/mongodb");
const passportConfig = require("./config/passport");
const app = express();

app.use(express.json());
app.use(bodyparser.urlencoded());
app.use(passport.initialize());
passportConfig(passport);
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

//setup all routes
app.use('/',routers)

let PORT = process.env.PORT || 4001;
connect();
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
