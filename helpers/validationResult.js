const { body, validationResult } = require("express-validator");

module.exports.bodyValidation = [
  body("email", "email is empty")
    .trim()
    .exists()
    .isEmail()
    .withMessage("invalid email address")
    .normalizeEmail(),
  body("password", "Invalid password")
    .trim()
    .exists()
    .isLength({ min: 8, max: 15 })
    .withMessage("password should have min and max length between 8-15")
    .matches(/\d/)
    .withMessage("password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one sepcial character"),
];

exports.isValid = (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body);

  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  } else next();
};
