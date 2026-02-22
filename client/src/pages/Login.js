import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../UI/Login.css"
import { toast } from "react-toastify";

function Login(){
    const navigate = useNavigate();

    const [user, setUser] = useState({
        identifier: "",
        password: ""
    })

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}) //Clears old errors

        try{
            const response = await fetch("/api/auth/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })

            const data = await response.json();

            if (response.ok){
                toast.success("Login Successfully !!");
                localStorage.setItem("token", data.token);
                navigate("/home");
            }

            else if(response.status === 400){
                 setErrors(data);
            }

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
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="identifier"
                        placeholder="Enter username or email"
                        onChange={handleChange}
                        required
                    />

                    {errors.username && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                            {errors.username}
                        </p>
                    )}

                    <br/>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                        required
                    />

                    {errors.password && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                            {errors.password}
                        </p>
                    )}

                    <br />

                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;