import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import "../UI/Home.css"

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        //Dummy data
        setTimeout(() => {
            try {
                const dummyPosts = [
                    {
                        _id: "1",
                        title: "My First Blog",
                        author: "Nehal",
                        createdAt: new Date(),
                    },
                    {
                        _id: "2",
                        title: "Learning React",
                        author: "John",
                        createdAt: new Date(),
                    }
                ]
                setPosts(dummyPosts);
                setLoading(false);
            }

            catch (err) {
                setError("Failed to load posts");
                setLoading(false);
            }
        }, 800)
    }, [])

    if (loading){
        return <p className="status">Loading posts...</p>;
    }

    if (error){
        return <p className="error"> {error} </p>
    }

    return(
        <div className="home-container">
            <h1 className="home-title">Latest Posts</h1>

            {posts.length === 0 ? (
                <p className="status">No post available.</p>
            ):(
                <div className="post-grid">
                    {posts.map((post) => (
                        <PostCard key={post._id} post = {post}/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home;