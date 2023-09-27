const withAuth = (req, res, next) => {
  const isLoggedIn = req.session.logged_in;
  const userRole = req.session.role;

  const handleLogout = () => {
    req.session.logged_in = false;
    res.redirect('/login');
  };

  if (!isLoggedIn) {
    console.error('User not logged in');
    res.redirect('/login');
    return;
  }

  const allowedRoles = ['admin', 'user'];
  if (!allowedRoles.includes(userRole)) {
    console.error('User does not have permission to access this page');
    res.redirect('/unauthorized');
    return;
  }

  const intendedDestination = req.session.intended_destination;
  if (intendedDestination) {
    delete req.session.intended_destination;
    res.redirect(intendedDestination);
    return;
  }

  const timeoutDuration = 30 * 60 * 1000;
  const lastActivityTime = req.session.last_activity_time;
  const currentTime = new Date().getTime();
  if (lastActivityTime && currentTime - lastActivityTime > timeoutDuration) {
    console.error('Session timeout');
    req.session.logged_in = false;
    res.redirect('/login');
    return;
  }
  req.session.last_activity_time = currentTime;

  next();
};

module.exports = withAuth;