// const JWT = require("jsonwebtoken");

// module.exports = async (req, res, next) => {
//   try {
//     const token = req.headers["authorization"].split(" ")[1];
//     JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
//       console.log("DECODED TOKEN:", decode);
//       if (err) {
//         return res.status(401).send({
//           success: false,
//           message: "Auth Failed",
//         });
//       } else {
//         req.userId = decode.userId;
//         next();
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(401).send({
//       success: false,
//       error,
//       message: "Auth Failed",
//     });
//   }
// };

const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Invalid token format",
      });
    }

    const token = authHeader.split(" ")[1];

    const decode = JWT.verify(token, process.env.JWT_SECRET);

    req.userId = decode.userId;
    req.role = decode.role;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);

    return res.status(401).send({
      success: false,
      message: "Auth Failed",
    });
  }
};
