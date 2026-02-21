const User = require("../Schema/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
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