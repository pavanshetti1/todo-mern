import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const generateToken = async(userId, res) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '10d',
    })

    res.cookie("jwt", token);
    await userModel.findByIdAndUpdate(userId, {token});
    return token;
}