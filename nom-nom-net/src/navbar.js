import "./index.css"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "./Context/AuthContext";

const Navbar = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    };

    return ( 
        <nav className="navbar">
            <h1>NomNomNet</h1>
            <div className="links">
                <Link to="/">Home</Link>
                {user ? (
             <>
            <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
              Welcome, {user.username || user.name || user.email}
            </span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
          <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
          </>
        )}    
                
            </div>
        </nav>
     );
}
 
export default Navbar;