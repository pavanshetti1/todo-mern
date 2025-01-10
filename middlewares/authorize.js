import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";

export const authenticate = async (req, res, next) =>{
    const token = req.cookies.jwt;

    if(!token) {
        return res.status(400).json({message: "Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded.userId);
    } catch (error) {
        return res.status(400).json({message : " " + error.message});
    }
    next();
}