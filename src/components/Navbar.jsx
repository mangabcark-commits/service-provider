import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const selectedCity = localStorage.getItem('selectedCity');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <Link className="brand" to={user ? '/locations' : '/login'}>
        Local Service App
      </Link>
      <nav>
        {user ? (
          <>
            <Link to="/locations">Locations</Link>
            <Link to="/services">Services</Link>
            <Link to="/bookings">My Bookings</Link>
            <span className="pill">{selectedCity || 'No city selected'}</span>
            <span className="pill">Hi, {user.name}</span>
            <button className="small-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
