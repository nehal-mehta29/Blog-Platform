import express from "express";
import authMiddleare from "../middleware/authMiddleware.js";
import { createPost, getAllPosts, getSinglePost } from "../controllers/postController.js";

const router = express.Router();

//Create Post
router.post("/",authMiddleare, createPost);

//Get all Post
router.get("/", getAllPosts);

//Get single post
router.get("/", getSinglePost);

export default router;