exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/login');
  return;
};

exports.ensureUnauthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
      res.redirect('/');
      return;
  }
  return next();
};
