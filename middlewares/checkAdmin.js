const checkAdmin = (req, res, next) => {
  
  if (!req.currentMember.auth.includes('admin')) {
    return res.status(401).json({
      status: false,
      error: 'Unauthorized::Only Admins'
    });
  }
  
  next();

};

module.exports = checkAdmin;