const db = require("../models/queries");
const pw = require("../passwordUtils/pw-encrypt");
const { body, validationResult } = require("express-validator");
const { validateUser } = require("../utils/input-validation");

exports.signUpPost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("sign-up", { errors: errors.array() });
      return;
    }

    req.body.password = await pw.encryptPW(req.body.password);
    const result = await db.addUserToDB(req.body);

    res.redirect("/sign-in");
  },
];

exports.membershipPost = [
  body("join").notEmpty().withMessage("Must select an option"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("join-club", { user: req.user, errors: errors.array() });
      return;
    }

    const { join } = req.body;

    const newMember =
      join == "true" ? await db.updateMembership(req.user.id) : null;

    //get user id and update status where id is

    // const update = await db.updateMembership(req.user.id)
    res.redirect("/");
  },
];
exports.adminFormPost = [
  body("admin").notEmpty().withMessage("Must select an option"),
  body("test")
    .isNumeric()
    .withMessage("Must be a number")
    .equals("4")
    .withMessage("Wrong answer, try again."),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("admin-form", { user: req.user, errors: errors.array() });
      return;
    }

    const newMember =
      req.body.admin == "true" ? await db.updateAdmin(req.user.id) : null;


    res.redirect("/");
  },
];

exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.createMessagePost = [
  body("msg").notEmpty().withMessage("Message cannot be empty"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("join-club", { user: req.user, errors: errors.array() });
      return;
    }

    let result = await db.addMessageToDB(req);

    res.redirect("/");
  },
];

exports.getIndexPage = async (req, res) => {
  const messages = await db.getMessages();

  res.render("index", { user: req.user, messages: messages });
};

exports.deleteMsgPost = async (req, res) => {
  const { id } = req.body;
  const result = await db.deleteMsg(id);


  res.redirect("/");
};
