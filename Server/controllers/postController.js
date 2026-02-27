/* =========================== POST CONTROLLER =========================== */

import Post from "../Schema/Post.js";
import mongoose from "mongoose";

// ================= CREATE NEW POST =================
export const createPost = async (req, res) => {
    try {
        // Extract data from request body
        const { title, content } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        // Create new post object
        const newPost = new Post({
            title,
            content,
            author: req.user.id
        })
      
        // Save post to database
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

// ================= GET ALL POSTS =================
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

// ================= GET SINGLE POST =================
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

// ================= DELETE POST =================
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Ownership check
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to delete this post"
            })
        }

        await post.deleteOne();

        res.status(200).json({
            message: "Post deleted successfully"
        })

    } 
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

// ================= UPDATE POST =================
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Ownership check
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to edit this post"
            })
        }

        post.title = title?.trim() || post.title;
        post.content = content?.trim() || post.content;

        const updatedPost = await post.save();

        res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost
        })

    } 
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

// ================= GET POSTS BY LOGGED-IN USER =================
export const getMyPosts = async(req,res) => {
    try{
        const posts = await Post.find({author: req.user.id})
            .sort({createdAt: -1})
            .populate("author", "username")

        res.status(200).json(posts)
    }

    catch(error){
        res.status(500).json({message: "Failed to fetch user posts"});
    }
}