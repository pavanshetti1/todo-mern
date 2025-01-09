import userModel from "../models/userModel.js";
import {z} from "zod";
import bcrypt from "bcrypt";
import { generateToken } from "../jwt/token.js";

const userSchema = z.object({ 
    username: z.string().min(3, {message: "username Should be at least 3 letters long"}),
    email: z.string().email({message:"invalid email address"}),
    password:z.string().min(6, {message:"password should be at least 6 character long "})
})

export const registerUser = async(req, res) =>{
    const { username, password, email} = req.body;

    try {

        if(!username || !password || !email){
            return res.status(400).json({errors: "All fields are required"});
        }

        const validation = userSchema.safeParse({username, password, email});

        if(!validation.success){
            const erroorMessage = validation.error.errors.map((err) => err.message);
            return res.status(400).json({errors:erroorMessage});
        }

        const user = await userModel.findOne({email});

        if(user){
            
            return res.status(400).json({errors: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const encrypted = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            username,
            password : encrypted,
            email
        });
        const token = generateToken(newUser._id, res);
        res.status(200).json({message: "User registered successfully", newUser, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error registering user"});
    }
}


export const loginUser = async(req, res) =>{
    const {email, password} = req.body;

    try {
        if(!email || !password) {
            return res.status(400).json({errors: "Both fields are required"});
        }


        const user = await userModel.findOne({email});

        if(!user || !await bcrypt.compare(password, user.password)){
            return res.status(400).json({errors:"invalid credentials"});
        }

        
        const token = generateToken(user._id, res);
        return res.status(200).json({message:"User loggedin successfully", user});
    
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error login user"});
    }
}


export const logoutUser = async(req, res) =>{
   try {
        res.clearCookie('jwt' ,{
            path: "/"
        });
        res.status(200).json({ message: "User logged out successfully" });
   } catch (error) {
    console.log(error);
    res.status(500).json({error: "Error logging ouit user"});
   }
}