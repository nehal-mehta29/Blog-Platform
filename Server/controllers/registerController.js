import bcrypt from "bcryptjs";
import User from "../Schema/User.js";

export const registerUser = async(req, res) => {
    try{
        const{username, email, password} = req.body;

        //Checking the required fields
        if (!username || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        //Checking if the user exists
        const existingUser = await User.findOne({username});
        if (existingUser){
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }

        // Check duplicate email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
          });
        }

        //Checking if the password is atleast 8 characters long
        if (!password || password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            });
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Save the user
        await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message : "User registered successfully !!"
        });
    }

    catch(error){
        res.status(500).json({
            success: false,
            message : "Server error"
        });
    }
}