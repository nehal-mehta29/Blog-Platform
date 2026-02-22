import bcrypt from "bcryptjs";
import User from "../Schema/User.js";

export const registerUser = async(req, res) => {
    try{
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