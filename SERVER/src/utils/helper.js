export const jsonGenrator=(statusCode,message,data=null)=>{
    return{status:statusCode,message:message,data:data}
}