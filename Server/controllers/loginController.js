import User from "../Schema/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async(req, res) => {
    try{
        const {identifier, password} = req.body;

        const user = await User.findOne({
            $or: [
                {email: identifier},
                {username: identifier}
            ]
        })

        if(!user){
            return res.status(400).json({
                username: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                password: "Incorrect Password"
            });
        }

        const token = jwt.sign(
            {id: user._id},
            "secretkey",
            {expiresIn: "1h"}
        )

        res.json({token});
    }

    catch(error){
        res.status(500).json({message:"Server error"})
    }
}