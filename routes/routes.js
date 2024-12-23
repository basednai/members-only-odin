const { Router } = require("express");
const controller = require("../controllers/controller");
const router = Router();
const passport = require("passport");

require("../config/passport.js");

/* ------------------- GETs ------------------- */
router.get("/", controller.getIndexPage);
router.get("/sign-up", (req, res) => res.render("sign-up"));
router.get("/sign-in", (req, res) => res.render("sign-in"));
router.get("/join-club", (req, res) =>  res.render("join-club", { user: req.user }))
router.get("/admin-form", (req, res) =>  res.render("admin-form", { user: req.user }))
router.get("/sign-out", controller.logout);
router.get("/create-message", (req, res) => res.render("create-message", { user: req.user }))


/* ------------------- POSTs ------------------- */
router.post("/sign-up", controller.signUpPost);
router.post(
    "/sign-in",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/sign-in",
    })
);
router.post("/join-club", controller.membershipPost);
router.post("/create-message", controller.createMessagePost);
router.post('/admin-form', controller.adminFormPost)
router.post("/delete/:id", controller.deleteMsgPost)

module.exports = router;
