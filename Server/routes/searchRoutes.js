import express from "express";
import { searchPosts } from "../controllers/searchController.js";

const router = express.Router();

//To search
router.get("/", searchPosts);

export default router;