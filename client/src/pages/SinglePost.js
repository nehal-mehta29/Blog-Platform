import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner.js";
import "../UI/SinglePost.css";

function SinglePost(){
    const {id} = useParams();
    const navigate = useNavigate();
    
    const[post, setPost] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState("");

    useEffect(() => {
        const fetchPost = async() =>{
            try{
                const res = await axios.get(`/api/posts/${id}`);
                setPost(res.data);
            }
            catch(err){
                setError("Post not found");
            }
            finally{
                setLoading(false);
            }
        }
        fetchPost();
    }, [id])

    if(loading) return <LoadingSpinner/>;
    if(error) return <p>{error}</p>;
    if(!post) return null;

    return(
        <div className="single-post-container">
            <h1>{post.title}</h1>

            <p className="post-meta">
                By {post.author?.username}.{""}
                {new Date(post.createdAt).toLocaleDateString()}
            </p>

            <div className="post-content">
                {post.content}
            </div>

            <button className="back-btn" onClick = {() =>navigate(-1)}>
                Go back
            </button>
        </div>
    )
}

export default SinglePost;