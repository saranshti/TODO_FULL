import { validationResult } from "express-validator";
import User from "../models/User.js";
import { jsonGenrator } from "../utils/helper.js";
import { StatusCode,JWT_TOKEN_SECRET } from "../utils/constant.js";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";

const Login = async (req,res)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const {username,password}=req.body;
        const user= await User.findOne({username:username,});

        if(!user){
            return res.json(jsonGenrator(StatusCode.UNPROCESSABLE_ENTRY,"Username or Password is incorrect."));
        }

        const verified = bcrypt.compareSync(password,user.password);

        if(!verified){
            return res.json(jsonGenrator(StatusCode.UNPROCESSABLE_ENTRY,"Username or Password is incorrect."));
        }

        const token = Jwt.sign({userId:user._id},JWT_TOKEN_SECRET);
        return res.json(jsonGenrator(StatusCode.SUCCESS,"Login SuccessFul",{userId:user._id,token:token}));
    }
    res.json(jsonGenrator(StatusCode.VALIDATION_ERROR,"Validation Error",errors.mapped()));
};

export default Login;