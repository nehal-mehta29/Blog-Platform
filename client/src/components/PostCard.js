/* ============================ POSTCARD ============================ */

import { Link } from "react-router-dom";
import "../UI/PostCard.css";

const PostCard = ({post}) =>{
    return(
        <div className="post-card">
            <Link to={`/posts/${post._id}`} className="post-link">
                <h3>{post.title}</h3>
            </Link>

            <p className="post-meta">
                By <strong>{post.author}</strong>
            </p>

            <small className="post-date">
                {new Date(post.createdAt).toLocaleDateString()}
            </small>
        </div>
    )
}

export default PostCard;