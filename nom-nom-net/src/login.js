import { Link , useNavigate} from "react-router-dom";
import "./index.css";
import axios from "axios";
import { useState } from "react";


const Login = () => {

    const[formData, setFormData]=useState({
        email:"",
        password:""
    });

    const[error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http:/localhost:5000/api/auth/login", formData);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            navigate("/");
        }catch (err){
            setError(err.response?.data?.message || "Login failed. Try again");
        }
    };

  return (
    <div className="login-container">
      <div className="card">
        <h1>Login / Sign Up</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="E-mail Address" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit" >Login</button>
        </form>

        {error && <p style={{color: "red"}}>{error}</p>}

        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Sign up today!</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
