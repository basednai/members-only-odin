const { body } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emptyErr = "cannot be empty.";

exports.validateUser = [
  body("fName")
    .trim()
    .notEmpty()
    .withMessage(`First name ${emptyErr}`)
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lName")
    .trim()
    .notEmpty()
    .withMessage(`Last name ${emptyErr}`)
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username ${emptyErr}`),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}`)
];
