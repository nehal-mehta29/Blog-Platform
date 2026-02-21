import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../UI/Login.css"

function Login(){
    const navigate = useNavigate();

    const [user, setUser] = useState({
        identifier: "",
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
            const response = await fetch("/api/auth/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })

            const data = await response.json();

            if (response.ok){
                alert("Login Successfully !!");
                localStorage.setItem("token", data.token);
                navigate("/home");
            }
            else{
                alert(data.message);
            }
        }

        catch(error){
            console.error(error);
            alert("Server error");
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

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;