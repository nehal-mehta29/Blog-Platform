import express from "express";
import { createComment, getCommentsByPost } from "../controllers/commentController";
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

//Get comments for a post
router.get("/:postId", getCommentsByPost);

//Create comment for a post
router.post("/:postId", authMiddleware, createComment);

export default router;