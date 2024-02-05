import { validationResult } from "express-validator";
import { jsonGenrator } from "../utils/helper.js";
import { StatusCode, JWT_TOKEN_SECRET } from "../utils/constant.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";


const Register = async (req,res) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const {name, username, password, email} = req.body;

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password,salt);
       // password = hashPassword; 

        const userExist = await User.findOne({ $or: [{
                email: email
        },{
                username: username
        }]});

        if(userExist){
            return res.json(jsonGenrator(StatusCode.UNPROCESSABLE_ENTRY,"User or Email already exists."))
        }

        try{
            const result = await User.create({
                name:name,
                email:email,
                password:hashPassword,
                username:username
            });
            const token = Jwt.sign({userId:result._id},JWT_TOKEN_SECRET);
            res.json(jsonGenrator(StatusCode.SUCCESS,"Registration Successfuly",{userId:result._id,token:token}));

        }catch(error){
            console.log(error);
        }
    }else{
        res.json(jsonGenrator(StatusCode.VALIDATION_ERROR,"Validation Error",errors.mapped()));
    }
}

export default Register;