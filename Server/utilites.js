
const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader;
  // console.log(token);
  if (!token) return res.status(400).json({ message: "401" });

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    // console.log(user)
    if (err) {
      console.log("User not geenrated"); return res.status(401).json({ msg: "Invalid or expired token" });
    }
    req.user = user;

    next();
  })
}
module.exports = {
  authenticateToken,
}
