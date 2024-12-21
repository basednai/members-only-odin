const db = require("../models/queries");
const pw = require("../passwordUtils/pw-encrypt");
const { validationResult } = require("express-validator");
const { validateUser } = require("../utils/input-validation");

exports.signUpPost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render("sign-up", { errors: errors.array() });
        return
    }
    //   const { fName, lName, username, password } = req.body;
    const result = await db.addUserToDB(req.body);

    res.redirect("/sign-in");
  },
];

exports.membershipPost = (req, res) => {
    // LAST PLACE
    //get user id and update status where id is 
}

exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

// exports.signInPost = async (req, res) => {
//   const { username, password } = req.body;

//   const hashedPW  = await db.getUserPW(username);

//   console.log(await pw.compare(password, hashedPW.password));

//   res.redirect("/sign-in");
// };
