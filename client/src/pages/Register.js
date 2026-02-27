/* ========================== REGISTER ========================== */

import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "../UI/Register.css";
import { toast } from "react-toastify";

function Register(){
    const navigate = useNavigate();

    //State to store user input values
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    //State to store validation errors returned from backend
    const [errors, setErrors] = useState({});

    //Handles input field changes dynamically
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    //Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});  //Clear old errors
        
        try{

            //Sends registeration request to backend
            const response = await fetch("/api/auth/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })

            const data = await response.json();

            if (response.status === 201){
                //To store the token
                localStorage.setItem("token", data.token);

                //Store user also
                localStorage.setItem("user", JSON.stringify(data.user));

                toast.success("Registered Successfully !!");
                navigate("/home");
            }

            //Backend validation error
            else if(response.status === 400){
                setErrors(data);
            }

            //Unexpected error
            else{
                toast.error(data.message || "Something went wrong");
            }
        }

        catch(error){
            console.error(error);
            toast.error("Server error !!");
        }
    }

    return(
        <div className="register-container">
            <div className="register-box">
                <h2>Register</h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>User Name</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            onChange={handleChange}
                            required
                        />

                        {/* Display username error if exists */}
                        {errors.username && (
                            <p style={{ color: "red", fontSize: "13px" }}>
                                {errors.username}
                            </p>
                        )}

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

                        {/* Display email error if exists */}
                        {errors.email && (
                            <p style={{ color: "red", fontSize: "13px" }}>
                                {errors.email}
                            </p>
                        )}

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

                        {/* Display password error */}
                        {errors.password && (
                            <p style={{ color: "red", fontSize: "13px" }}>
                                {errors.password}
                            </p>
                        )}

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