import User from "../Schema/User.js";
import Post from "../Schema/Post.js";

export const searchPosts = async (req, res) => {
    try{
        const {query} = req.query;

        if(!query){
            return res.status(400).json({message: "Search query is required"});
        }

        //To find user whose username matches
        const users = await User.find({
            username: {$regex: query, $options: "i"}
        })

        const userIds = users.map(user => user._id);

        //Search posts by title or author
        const posts = await Post.find({
            $or: [
                {title: {$regex: query, $options: "i"}},
                {author: {$in: userIds}}
            ]
        })
        .populate("author", "username").sort({createdAt: -1});

        res.status(200).json(posts);
    }

    catch(error){
        console.error("Search error: ", error);
        res.status(500).json({message: "Search failed"})
    }
}