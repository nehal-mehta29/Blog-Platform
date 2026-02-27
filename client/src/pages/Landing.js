/* ============================ LANDING PAGE ============================ */

import React from "react";
import { useNavigate } from "react-router-dom";
import "../UI/Landing.css";

function Landing(){
    const navigate = useNavigate();

    return(
        <div className="landing-container">
            <h1>Welcome to Blog Platform !!</h1>

            <div className="landing-button">
                <button onClick={() => navigate("/login")}>
                    Login
                </button>

                <button onClick={() => navigate("/register")}>
                    Register
                </button>
            </div>
        </div>
    )
}

export default Landing;