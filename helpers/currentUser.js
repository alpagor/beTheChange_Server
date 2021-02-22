var jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   // check header or url parameters or post parameters for token
//   var token =
//     req.body.token ||
//     req.query.token ||
//     req.headers["x-access-token"] ||
//     req.headers["authorization"];

//   // decode token
//   if (token) {
//     var hash = config.secret.replace(/^\$2y(.+)$/i, "$2a$1");
//     // verifies secret
//     jwt.verify(token, hash, function (err, decoded) {
//       if (err) {
//         return res.status(403).json({ message: "Invalid token" });
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         wpUserModel.getUserInformationById(
//           req.decoded.id,
//           function (err, user) {
//             req.currentUser = user;
//             next();
//           }
//         );
//       }
//     });
//   } else {
//     // if there is no token

//     return res.status(403).json({
//       message: "Invalid token",
//     });
//   }
// };

// const authenticateJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader) {
//     const token = authHeader.split(" ")[1];

//     jwt.verify(token, accessTokenSecret, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }

//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };

module.exports = {
  authenticateJWT: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
          if (err) {
            return res.sendStatus(403);
          }

          req.user = user;
          next();
        });
      }
    } catch (error) {
      res.status(401).json(error);
    }
  },
};
