import express from "express";
import Post from "../Schema/Post.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//CREATE POST
router.post("/", authMiddleware, async (req, res) => {
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
})

export default router;