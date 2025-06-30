import "./index.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "./Context/AuthContext"; 


const Signup = () => {

    const[formData, setFormData]= useState({
        username: "",
        email:"",
        password:""
    });

    const { setUser } = useAuth();


    const[error, setError]= useState("");
    const navigate =useNavigate();

    //handle input change
    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };


    //handle form submit
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            //send post req
            //const response = await axios.post("", formData)
            const response = await axios.post("http://localhost:5000/signup", formData);

            const userData = {
                id: response.data.user._id,
                token: response.data.token,
                username: response.data.user.username,
                email: response.data.user.email,
            };

            setUser(userData); // 🔥 context
            localStorage.setItem("user", JSON.stringify(userData)); // 🔄 persist
            

            //redirect to home or dashboard
            console.log("form success hahah")
            navigate("/")
        } catch(err){
            console.error(err);
            setError(err.response?.data?.message || "Signup failed")
        }
    };

    return (  
    <div className="login-container">
      <div className="card">
        <h1>Sign Up</h1>
        <form className="login-form " onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange}  required></input>
          <input type="email" name="email" placeholder="E-mail Address" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit">Sign Up</button>
        </form>
        <p className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
            
    );
}

export default Signup;