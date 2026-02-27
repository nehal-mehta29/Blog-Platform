/* =========================== COMMENT CONTROLLER =========================== */

import Comment from "../Schema/Comment.js";

// ================= CREATE NEW COMMENT =================
export const createComment = async(req, res) => {
    try{
        // Get comment text from request body
        const {content} = req.body;

        // Get post ID from URL parameters
        const {postId} = req.params;

        // To check validate input
        if(!content){
            return res.status(400).json({message: "Comment cannot be empty"});
        }

        // Create a new comment in the database
        const newComment = await Comment.create({
            content,
            post: postId,
            author: req.user.id     //Comes from authMiddleware
        })

        // Populate the 'author' field to return username instead of just ID
        const populatedComment = await newComment.populate(
            "author", "username"
        )

        // Send the populated comment back to client
        res.status(201).json(populatedComment);
    }

    catch(error){
        res.status(500).json({message: "Failed to post comment"})
    }
}

// ================= GET COMMENTS FOR A POST =================
export const getCommentsByPost = async(req, res) => {
    try{
        // Get post ID from URL parameters
        const{postId} = req.params;

        // Find all comments for the given post, populate author username, newest first
        const comments = await Comment.find({post: postId})
        .populate("author", "username")
        .sort({createdAt: -1});

        res.status(200).json(comments);
    }

    catch(error){
        res.status(500).json({message: "Failed to fetch comments"})
    }
}