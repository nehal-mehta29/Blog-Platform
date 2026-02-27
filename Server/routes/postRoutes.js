import express from "express";
import { createPost, deletePost, getAllPosts, getMyPosts, getSinglePost, updatePost } from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//Create Post
router.post("/",authMiddleware, createPost);

//Get user's Post
router.get("/my-post", authMiddleware, getMyPosts);

//Get all Post
router.get("/", getAllPosts);

//Get single post
router.get("/:id", getSinglePost);

//Update Post
router.put("/:id", authMiddleware, updatePost);

//Delete Post
router.delete("/:id", authMiddleware, deletePost)

export default router;