const jwt = require("jsonwebtoken");

const SECRET = "M3str1@";

async function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];
  // const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ auth: false, message: "Token não informado." });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, message: err.message });
    }

    req.userId = decoded.id;

    next();
  });
}

module.exports = verifyJWT;
