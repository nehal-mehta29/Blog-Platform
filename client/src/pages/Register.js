import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "../UI/Register.css";

function Register(){
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const response = await fetch("/api/auth/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })

            const data = await response.json();

            if (response.status === 201){
                alert("Registered Successfully !!");
                navigate("/");
            }

            else{
                alert(data.message);
            }
        }

        catch(error){
            console.error(error);
            alert("Server error !!");
        }
    }

    return(
        <div className="register-container">
            <div className="register-box">
                <h2>Register</h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="input-group">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <button type="submit" className="register-btn">
                        Create Account
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Register;