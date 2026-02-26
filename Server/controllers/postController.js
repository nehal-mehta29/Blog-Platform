import Post from "../Schema/Post.js";
import mongoose from "mongoose";

//CREATE POST
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const newPost = new Post({
            title,
            content,
            author: req.user.id
        })
      
        const savedPost = await newPost.save();
      
        res.status(201).json({
            message: "Post created successfully",
            post: savedPost
        })
    }

    catch(error){
        res.status(500).json({message: "Server error"});
    }
}

//GET ALL POSTS
export const getAllPosts = async(req, res) => {
    try{
        const posts = await Post.find()
        .populate("author","username")      //only return username
        .sort({createdAt: -1});             //newest first

        res.status(200).json(posts);
    }

    catch(error){
        console.error("Error fetching posts: ",error);
        res.status(500).json({message: "Server error"});
    }
}

//GET SINGLE POST
export const getSinglePost = async (req, res) => {
    try{
        const{id} = req.params;

        //Validate MongoDB objectId
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message : "Invalid post ID"});
        }

        const post = await Post.findById(id).populate("author", "username");

        if(!post){
            return res.status(404).json({message: "Post not found"});
        }

        res.status(200).json(post);
    }

    catch(error){
        res.status(500).json({message: "Server error"});
    }
}