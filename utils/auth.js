import { useHistory } from 'react-router-dom';

const withAuth = (Component) => {
  const AuthComponent = () => {
    const history = useHistory();
    const userRole = sessionStorage.getItem('role');
    
    if (!sessionStorage.getItem('logged_in')) {
      console.error('User not logged in');
      history.push('/login');
      return null;
    }
    
    // Redirect to a specific page after login
    if (sessionStorage.getItem('logged_in')) {
      history.push('/dashboard');
      return null;
    }
    
    const handleLogout = () => {
      // Clear session storage and redirect to login page
      sessionStorage.removeItem('logged_in');
      history.push('/login');
    }
    
    // Check user role for access control
    if (userRole !== 'admin') {
      console.error('User does not have permission to access this page');
      history.push('/unauthorized');
      return null;
    }
    
    return (
      <>
        <button onClick={handleLogout}>Logout</button>
        <Component />
      </>
    );
  }
  
  return AuthComponent;
}
