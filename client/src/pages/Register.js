import React, { useState } from "react";
import "../UI/Register.css";

function Register(){
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
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
                            name="name"
                            placeholder="Enter your full name"
                            value={user.name}
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
                        value={user.email}
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
                        value={user.password}
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