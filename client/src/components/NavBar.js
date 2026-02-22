/*=================== Navigation Bar ===================*/
/*To display navigation bar with links to all the pages*/
import { Link } from "react-router-dom";
import "../UI/Navbar.css"

export default function Navbar() {
    return(
        <nav className="navbar">
            <h2 className="navbar-head">
                <Link to="/home">Blog Platform</Link>
            </h2>

            <div>
                <Link to="/home">Home</Link>
                <Link to="/createPost">New Post</Link>
                <Link to="profile">Profile</Link>
                <Link to="login">Logout</Link>
            </div>
        </nav>
    )
}