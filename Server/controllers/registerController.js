import bcrypt from "bcryptjs";
import User from "../Schema/User.js";
import jwt from "jsonwebtoken";

export const registerUser = async(req, res) => {
    try{
        //To extract data
        const{username, email, password} = req.body;

        let errors = {};

        //Checking the required fields
        if (!username || username.trim() === "") {
            errors.username = "Username is required";
        }

        if (!email || email.trim() === "") {
            errors.email = "Email is required";
        }

        if (!password) {
            errors.password = "Password is required";
        } 
        
        else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }

        //If there are validation errors then return them
        if (Object.keys(errors).length >0){
            return res.status(400).json(errors);
        }

        //Checking if the user exists
        const existingUser = await User.findOne({username});
        if (existingUser){
            return res.status(400).json({
                username: "Username already exists"
            });
        }

        // Check duplicate email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                email: "Email already registered"
          });
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Save the user
        const savedUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        //To generate token for new user
        const token = jwt.sign(
            {id: savedUser._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        res.status(201).json({
            success: true,
            message : "User registered successfully !!",
            token
        });
    }

    catch(error){
        res.status(500).json({
            success: false,
            message : "Server error"
        });
    }
}