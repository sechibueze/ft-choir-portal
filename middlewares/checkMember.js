const jwt = require('jsonwebtoken');

const checkMember = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token) {
    return res.status(401).json({
      status: false,
      error: 'Unauthorized::No token in header'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: 'Cannot decode token'
      });
    }

    const currentMember = {
      memberId: decoded.memberId,
      access: decoded.access,
      auth: decoded.auth
    }
    req.currentMember = currentMember;
    next();
  });

};

module.exports = checkMember;