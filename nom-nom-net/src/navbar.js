import "./index.css"
import { Link } from 'react-router-dom';

const navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>NomNomNet</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </nav>
     );
}
 
export default navbar;