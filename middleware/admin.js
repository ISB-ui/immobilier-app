const isAdmin = (req, res, next) => {
  // req.user vient du middleware auth
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Accès interdit : administrateur requis",
    });
  }

  next();
};

module.exports = isAdmin;
