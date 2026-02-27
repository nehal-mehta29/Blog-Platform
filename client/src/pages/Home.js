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

    //State to search
    const[search, setSearch] = useState("");

    //Fetch posts from backend 
    useEffect(() => {
        const fetchPosts = async() => {
            try{
                setLoading(true);
                //Decide endpoint based on requirements
                const endpoint = search.trim() ? `/api/search?query=${search}` : `/api/posts`;

                const response = await axios.get(endpoint);

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
    }, [search])

    if(error){
        return <div className="status-message error">{error}</div>
    }

    return(
        <div className="home-container">
            <h2>All Blog Posts</h2>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by title or author..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />

            {loading && <LoadingSpinner />}

            {!loading && posts.length === 0 ? (
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