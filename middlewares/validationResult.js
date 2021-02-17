const { validationResult } = require("express-validator");

exports.isValid = (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      res.send({});
    }
  }