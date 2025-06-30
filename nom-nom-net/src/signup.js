import "./index.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Signup = () => {

    const[formData, setFormData]= useState({
        username: "",
        email:"",
        password:""
    });

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
            // Simulate a delay and a mock response
            await new Promise((res) => setTimeout(res, 1000)); // 1 second fake delay

            const response = {
                data: {
                    token: "mock-jwt-token",
                    user: {
                        id: "12345",
                        username: formData.username,
                        email: formData.email,
                    },
                },
            };

            //store token
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user))

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