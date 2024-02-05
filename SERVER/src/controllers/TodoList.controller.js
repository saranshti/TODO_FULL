import { jsonGenrator } from "../utils/helper.js";
import User from "../models/User.js";
import { StatusCode } from "../utils/constant.js";


export const GetTodos = async (req,res) =>{
    try{
        const list = await User.findById(req.userId).select("-password").populate('todos').exec();
        return res.json(jsonGenrator(StatusCode.SUCCESS,"All todo List",list));
    }catch(error){
        return res.json(jsonGenrator(StatusCode.UNPROCESSABLE_ENTRY,"Error",error)); 
    }
}