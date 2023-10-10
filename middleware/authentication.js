// authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config'); // Assuming you have a configuration file for secret keys

module.exports = (req, res, next) => {
  // Get the token from the request headers or cookies
  const token = req.headers.authorization || req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Authentication failed. Token missing.' });
  }

  // Verify the token
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Authentication failed. Invalid token.' });
    }

    // Attach the decoded user information to the request for use in subsequent middleware or route handlers
    req.user = decoded.user;
    next();
  });
};
