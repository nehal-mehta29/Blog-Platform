import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import {formatDistanceToNow} from "date-fns";
import "../UI/Home.css"

function Home() {
    
    //State to store posts fetched from api
    const [posts, setPosts] = useState([]);

    //State to manage loading 
    const [loading, setLoading] = useState(true);

    //State to handle errors
    const [error, setError] = useState("");

    //Fetch posts from backend 
    useEffect(() => {
        const fetchPosts = async() => {
            try{
                const response = await axios.get("/api/posts");

                //Store fetched posts in state
                setPosts(response.data);
            }

            catch(err){
                //Set user-friendly error message
                setError("Failed to load posts. Please try again");
            }

            finally{
                //Stop loading spinner whether success or failure
                setLoading(false);
            }
        }

        fetchPosts();
    }, [])

    //To convert ISO date to relative time string
    const fromatPostDate = (date) =>{
        return formatDistanceToNow(new Date(date), {addSuffix:true})
    }

    //Conditional Rendering
    if(loading){
        return<LoadingSpinner/>
    }

    if(error){
        return <div className="status-message error">{error}</div>
    }

    return(
        <div className="home-container">
            <h2>All Blog Posts</h2>

            {posts.length === 0 ? (
                <p className="status-message">No posts available.</p>
            ) : (
                <div className="post-list">

                    {posts.map((post) => (
                        <Link
                            to={`/post/${post._id}`}
                            key={post._id}
                            className="post-card"
                        >
                        {/* Post Title */}
                        <h3>{post.title}</h3>

                        {/* Post Metadata */}
                        <p className="post-meta">
                            By {post.author?.username}.{" "}
                            {formatDistanceToNow(new Date(post.createdAt), {addSuffix: true})}
                        </p>

                        </Link>
                    ))}

            </div>
        )}
        </div>
    )
}

export default Home;