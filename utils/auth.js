const withAuth = (Component) => {
  const AuthComponent = () => {
    const history = useHistory();
    const isLoggedIn = sessionStorage.getItem('logged_in');
    const userRole = sessionStorage.getItem('role');

    const handleLogout = () => {
      sessionStorage.removeItem('logged_in');
      history.push('/login');
    };

    // Error handling
    if (!isLoggedIn) {
      console.error('User not logged in');
      history.push('/login');
      return null;
    }

    // Role-based access control
    const allowedRoles = ['admin']; // Modify this array with allowed roles
    if (!allowedRoles.includes(userRole)) {
      console.error('User does not have permission to access this page');
      history.push('/unauthorized');
      return null;
    }

    // Redirecting to a specific page after login
    const intendedDestination = sessionStorage.getItem('intended_destination');
    if (intendedDestination) {
      sessionStorage.removeItem('intended_destination');
      history.push(intendedDestination);
      return null;
    }

    // Authentication timeout
    const timeoutDuration = 30 * 60 * 1000; // 30 minutes
    const lastActivityTime = sessionStorage.getItem('last_activity_time');
    const currentTime = new Date().getTime();
    if (lastActivityTime && currentTime - lastActivityTime > timeoutDuration) {
      console.error('Session timeout');
      sessionStorage.removeItem('logged_in');
      history.push('/login');
      return null;
    }
    sessionStorage.setItem('last_activity_time', currentTime);

    return (
      <>
        <button onClick={handleLogout}>Logout</button>
        <Component />
      </>
    );
  };

  return AuthComponent;
};