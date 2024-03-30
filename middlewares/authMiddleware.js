const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json("you are not authorized");
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.json("token not exist");
  }
  jwt.verify(token, "mySecretCode200987**$" , (error, user) => {
    if (error) {
      res.status(401).json("you are not authorized");
    }
    req.user = user;
  });
  next();
};

module.exports = auth;