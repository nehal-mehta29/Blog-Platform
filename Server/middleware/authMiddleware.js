import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

    //To get authorization header from request
    const authHeader = req.headers.authorization;

    //Checking if header exists and start with "Bearer"
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({
            message: "Access denied. No token provided"
        })
    }

    try{
        //To extract token from header
        const token = authHeader.split(" ")[1];

        // Verify token using JWT secret key from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach decoded user data to request object (allows access to req.user inside protected routes)
        req.user = decoded;

        //Move to next middleware or route handles
        next();
    }

    catch(error){
        //If token is invalid or expired
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}

export default authMiddleware;