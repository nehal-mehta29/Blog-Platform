import axios from "axios";
import { useEffect, useState } from "react"
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import "../UI/Profile.css"

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchMyPosts = async () => {
            try{
                const res = await axios.get("/api/posts/my-post",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                )
                setPosts(res.data);
            }

            catch(err){
                setError("Failed to load your posts");
            }

            finally{
                setLoading(false);
            }
        }
        fetchMyPosts();
    }, [token])

    if (loading) return <LoadingSpinner/>;
    if (error) return <p>{error}</p>;

    return(
        <div className="profile-container">
            <h2>My Posts</h2>

            {posts.length === 0 ?(
                <p>You haven't created any posts yet.</p>
            ) : (
                posts.map((post) => (
                    <div key={post._id} className="post-card">
                        <Link to={`/post/${post._id}`}>
                            <h3>{post.title}</h3>
                        </Link>
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