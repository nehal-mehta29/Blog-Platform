export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
          .populate("author", "username")
          .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } 
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};