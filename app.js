require("dotenv").config();

const express = require("express");
const router = require("./routes/routes");
const session = require("express-session");
const passport = require("./config/passport.js");

const app = express();
const PORT = 3000;

/* ------------- passport config -------------- */

app.use(passport.initialize());
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(PORT, () => console.log("listening on port", PORT));

