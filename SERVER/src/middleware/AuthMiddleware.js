import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constant.js"
import { jsonGenrator } from "../utils/helper.js"
import Jwt from "jsonwebtoken";

/**
 * 
 * @param {*} res 
 * @param {*} req 
 * @param {*} next 
 * @returns 
 */

const AuthMiddleware = (req,res,next) => {
    if(req.headers["auth-token"] === undefined){
        return res.json(jsonGenrator(StatusCode.AUTH_ERROR,"Access Denied"));
    }
    
    const token = req.headers["auth-token"];

    try{
        const decoded = Jwt.verify(token,JWT_TOKEN_SECRET);
        console.log(decoded);
        req.userId = decoded.userId;
        return next();
    }catch(error){
        return res.json(jsonGenrator(StatusCode.UNPROCESSABLE_ENTRY,"Invalid Token"));
    }
};

export default AuthMiddleware;