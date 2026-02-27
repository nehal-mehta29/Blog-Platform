import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner.js";
import { formatDistanceToNow } from "date-fns";
import "../UI/SinglePost.css";

function SinglePost(){
    //To read user from localStorage
    let currentUser = null;
    
    try{
        const storedUser = localStorage.getItem("user");
        if(storedUser && storedUser !== "undefined"){
            currentUser = JSON.parse(storedUser);
        }
    }

    catch(error){
        console.error("Invalid user in localStorage");
        currentUser = null;
    }

    const token = localStorage.getItem("token");

    const {id} = useParams();
    const navigate = useNavigate();
    
    const[post, setPost] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState("");
    const[editing, setEditing] = useState(false);
    const[formData, setFormData] = useState({title: "", content: ""});
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    //Fetching single post
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

    //Fetching comments
    useEffect(() => {
        const fetchComments = async () => {
            try{
                const res = await axios.get(`/api/comments/${id}`);
                setComments(res.data);
            }

            catch(err){
                console.error("Error fetching comments");
            }
        }

        fetchComments();
    }, [id])

    //Handle comment submit
    const handleCommentSubmit = async(e) => {
        e.preventDefault();

        try{
            await axios.post(
                `/api/comments/${id}`,
                {content: commentText},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setCommentText("");

            //Refresh comments after posting
            const res = await axios.get(`/api/comments/${id}`);
            setComments(res.data);
        }

        catch(err){
            console.error("Error adding comment");
        }
    }

    //Delete post handler
    const handleDelete = async() => {
        if(window.confirm("Are you sure you want to delete this post?")){
            try{
                await axios.delete(`/api/posts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                navigate("/home");  //Navigate to home page
            }

            catch(err){
                alert("Error deleting a post")
            }
        }
    }

    //For editing
    const startEditing = () => {
        setFormData({
            title: post.title,
            content: post.content,
        })
        setEditing(true);
    }
 
    //Update post handler
    const handleUpdate = async () => {
        try {
            const res = await axios.put(`/api/posts/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPost(res.data.post);
            setEditing(false);
        } 
        catch (err) {
            console.error(err);
            alert("Error updating post");
        }
    };

    if(loading) return <LoadingSpinner/>;
    if(error) return <p>{error}</p>;
    if(!post) return null;

    //To check if the user viewing a post is the author of that post
    const isAuthor = currentUser && post.author && currentUser.id === post.author._id;

    return(
        <div className="single-post-container">
            
            {editing ? (
                <div className="edit-form">
                    <input 
                        type="text"
                        value={formData.title}
                        onChange={(e) => 
                            setFormData({ ...formData, title: e.target.value })
                        }
                    />
                    <textarea
                        value={formData.content}
                        onChange={(e) => 
                            setFormData({ ...formData, content: e.target.value })
                        }
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditing(false)}>Cancel</button>
                </div>

            ) : (
                <>
                    <h1>{post.title}</h1>

                    <p className="post-meta">
                        By {post.author?.username}.{""}
                        {new Date(post.createdAt).toLocaleDateString()}
                    </p>

                    <div className="post-content">
                        {post.content}
                    </div>

                    {isAuthor && (
                        <div className="post-actions">
                            <button onClick={startEditing}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                    )}

                    <button className="back-btn" onClick = {() =>navigate(-1)}>
                        Go back
                    </button>

                    {/* ================= COMMENTS SECTION ================= */}

                    <div className="comments-section">
                        <h3>Comments</h3>

                        <form onSubmit={handleCommentSubmit} className="comment-form">
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Write a comment..."
                                required
                            />
                            <button type="submit">Post Comment</button>
                        </form>

                        {comments.length === 0 ? (
                            <p>No comments yet.</p>
                        ) : (
                            comments.map((comment) => (
                                <div key={comment._id} className="comment-item">
                                    <strong>{comment.author?.username}</strong>
                                    <span className="comment-time">
                                        {" "}
                                        {formatDistanceToNow(
                                            new Date(comment.createdAt),
                                            { addSuffix: true }
                                        )}
                                    </span>
                                    <p>{comment.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default SinglePost;