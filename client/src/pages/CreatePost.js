/* ======================== CREATE POST ======================== */

import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import "../UI/CreatePost.css";

function CreatePost() {
    const navigate = useNavigate();

    //State to store post from data
    const [post, setPost] = useState({
        title: "",
        content: ""
    });

    //State to handle loading spinner
    const [loading, setLoading] = useState(false);

    //To handle input field changes
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    //To handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        //Get JWT token from localStorage
        const token = localStorage.getItem("token");

        try {
            //Start loading
            setLoading(true);

            //API call to backend to create post
            await axios.post(
                "http://localhost:5000/api/posts",
                post,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            //Success message
            toast.success("Post created successfully");

            //Redirect to home page
            navigate("/home");
        }
        
        catch (error) {
            toast.error(error.response?.data?.message || "Failed to create post");
        } 

        finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-post-container">
            <h2>Create New Post</h2>

            {/* Create Post Form */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Post Title"
                    value={post.title}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="content"
                    placeholder="Write your content..."
                    value={post.content}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Post"}
                </button>

                {/* Loading Spinner */}
                {LoadingSpinner && (
                    <div>
                        <LoadingSpinner />
                    </div>
                )}
            </form>
        </div>
    );
}

export default CreatePost;