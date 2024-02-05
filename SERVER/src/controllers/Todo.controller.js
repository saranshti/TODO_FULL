import { validationResult } from "express-validator";
import { jsonGenrator } from "../utils/helper.js";
import { StatusCode } from "../utils/constant.js";
import User from "../models/User.js";
import Todo from "../models/Todo.js";

export const createTodo = async (req,res)=>{
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.json(jsonGenrator(StatusCode.VALIDATION_ERROR,"Todo is required",error.mapped()));
    }
    try{
        const result = await Todo.create({
            userId:req.userId,
            desc: req.body.desc,
        }) 
        if(result){
            const user= await User.findOneAndUpdate({_id:req.userId},
                {
                    $push:{todos:result},
                }
            );
            return res.json(jsonGenrator(StatusCode.SUCCESS,"Todo created successfully",result));
        }
    }catch(error){
        return res.json(jsonGenrator(StatusCode.UNPROCESSABLE_ENTRY,"Something went wrong",error));
    }
};