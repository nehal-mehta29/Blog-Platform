/* ============================ 404 ============================ */

import {Link} from "react-router-dom";
import "../UI/NotFound.css";

const NotFound = () => {
    return(
        <div className="not-found-container">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>

            <Link to="/home" className="home-btn">
                Go Back
            </Link>
        </div>
    )
}

export default NotFound;