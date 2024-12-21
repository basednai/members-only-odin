const { Router } = require("express");
const controller = require("../controllers/controller");
const router = Router();
const passport = require("passport");

require("../config/passport.js");

/* ------------------- GETs ------------------- */
router.get("/", (req, res) => {
  res.render("index", { user: req.user });
});
router.get("/sign-up", (req, res) => res.render("sign-up"));
router.get("/sign-in", (req, res) => res.render("sign-in"));
router.get("/join-club", (req, res) => {
  console.log(req.user);
  res.render("join-club", { user: req.user });
});

/* ------------------- POSTs ------------------- */
router.post("/sign-up", controller.signUpPost);

router.post(
  "/sign-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

router.get("/sign-out", controller.logout);

module.exports = router;
