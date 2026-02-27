import Comment from "../Schema/Comment.js";

export const createComment = async(req, res) => {
    try{
        const {content} = req.body;
        const {postId} = req.params;

        if(!content){
            return res.status(400).json({message: "Comment cannot be empty"});
        }

        const newComment = await Comment.create({
            content,
            post: postId,
            author: req.user.id     //Comes from authMiddleware
        })

        const populatedComment = await newComment.populate(
            "author", "username"
        )

        res.status(201).json(populatedComment);
    }

    catch(error){
        res.status(500).json({message: "Failed to post comment"})
    }
}

export const getCommentsByPost = async(req, res) => {
    try{
        const{postId} = req.params;

        const comments = await Comment.find({post: postId})
        .populate("author", "username")
        .sort({createdAt: -1});

        res.status(200).json(comments);
    }

    catch(error){
        res.status(500).json({message: "Failed to fetch comments"})
    }
}