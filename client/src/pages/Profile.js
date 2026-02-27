/* ==================================== PROFILE  ====================================*/

import axios from "axios";
import { useEffect, useState } from "react"
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import "../UI/Profile.css"

const Profile = () => {

    //State to hold user's posts
    const [posts, setPosts] = useState([]);

    //State to handle loading status
    const [loading, setLoading] = useState(true);

    //State to handle error messages
    const [error, setError] = useState("");

    //Retrieve the authentication token from loacalStorage
    const token = localStorage.getItem("token");

    // To fetch user's posts 
    useEffect(() => {
        const fetchMyPosts = async () => {
            try{
                const res = await axios.get("/api/posts/my-post",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,       //To add token to request headers
                        }
                    }
                )

                //To save fetched posts in state
                setPosts(res.data);
            }

            catch(err){
                setError("Failed to load your posts");
            }

            finally{
                setLoading(false);
            }
        }

        //function call
        fetchMyPosts();
    }, [token])

    if (loading) return <LoadingSpinner/>;
    if (error) return <p>{error}</p>;

    return(
        <div className="profile-container">
            <h2>My Posts</h2>

            {/* Conditional rendering based on whether user has posts */}
            {posts.length === 0 ?(
                <p>You haven't created any posts yet.</p>
            ) : (
                posts.map((post) => (
                    <div key={post._id} className="post-card">

                        {/* Link to individual post page */}
                        <Link to={`/post/${post._id}`}>
                            <h3>{post.title}</h3>
                        </Link>

                        {/* Display formatted creation date */}
                        <p>
                            {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))
            )}
        </div>
    )
}

export default Profile;