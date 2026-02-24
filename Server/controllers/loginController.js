import User from "../Schema/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async(req, res) => {
    try{

        //To extract identifier(email or username) and password 
        const {identifier, password} = req.body;

        //Find user by email or username
        const user = await User.findOne({
            $or: [                          //$or operator allows matching either condition
                {email: identifier},
                {username: identifier}
            ]
        })

        //Checking if the user exists or not
        if(!user){
            return res.status(400).json({
                username: "User not found"
            });
        }

        //Matching the password with the hashed password stored in DB
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                password: "Incorrect Password"
            });
        }

        //To generate JWT token
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        //Sending token to client
        res.json({token});
    }

    catch(error){
        res.status(500).json({message:"Server error"})
    }
}