/*=================== Navigation Bar ===================*/
/*To display navigation bar with links to all the pages*/
import { Link, useNavigate } from "react-router-dom";
import "../UI/Navbar.css"

export default function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }
    return(
        <nav className="navbar">
            <h2 className="navbar-head">
                <Link to="/home">Blog Platform</Link>
            </h2>

            <div>
                <Link to="/home">Home</Link>
                <Link to="/create">New Post</Link>
                <Link to="profile">Profile</Link>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>
        </nav>
    )
}