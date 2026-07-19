import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="navbar-logo">
            🚗
          </div>

          <div>
            <h1>Vehicle Inventory</h1>
            <span>Dealership Management System</span>
          </div>
        </div>

        <div className="navbar-right">
          <div className="navbar-user">
            <h3>{user?.name}</h3>
            <span>{user?.role}</span>
          </div>

          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;