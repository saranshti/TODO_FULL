import { validationResult } from "express-validator";
import { jsonGenrator } from "../utils/helper.js";
import { StatusCode } from "../utils/constant.js";
import Todo from "../models/Todo.js";

export const MarkTodo = async (req,res) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.json(jsonGenrator(StatusCode.VALIDATION_ERROR,"todo id is required",error.mapped())); 
    };

    try{
        const todo = await Todo.findOneAndUpdate({
            _id:req.body.todo_id,
            userId: req.userId,
        },[
            {
                $set:{
                    iSCompleted:{
                        $eq:[false,"$iSCompleted"]
                    }
                }
            }
        ]);

        if(todo){
            return res.json(jsonGenrator(StatusCode.SUCCESS,"updated",todo));
        }
    }catch(error){
        return res.json(jsonGenrator(StatusCode.UNPROCESSABLE_ENTRY,"could not update",null));
    }

};