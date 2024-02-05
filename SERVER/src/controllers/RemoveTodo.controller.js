import { validationResult } from "express-validator";
import { jsonGenrator } from "../utils/helper.js";
import { StatusCode } from "../utils/constant.js";
import Todo from "../models/Todo.js";
import User from "../models/User.js";

export const RemoveTodo = async (req,res) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.json(jsonGenrator(StatusCode.VALIDATION_ERROR,"todo id is required",error.mapped())); 
    }

    try{
        const result = await Todo.findOneAndDelete({
            userId:req.userId,
            _id:req.body.todo_id,
        });
        if(result){
            const user=await User.findByIdAndUpdate(
                { _id:req.userId,},
                {
                    $pull:{todos:req.body.todo_id}
                }
            );
            return res.json(jsonGenrator(StatusCode.SUCCESS,"todo deleted",null));
        }
    }catch(error){
        return res.json(jsonGenrator(StatusCode.UNPROCESSABLE_ENTRY,"todo not deleted",null));
    }
};
