//this is nodejs own class
//this only take message as parameter with this we cannot send statuscode ('error',500)
// class Error{
// constructor(message){
//     this.message=message;
// }
// }
// throw new Error('this is an errorr message',500)

//create own class
class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);//from Error
        this.statusCode=statusCode;
    }
}

//set up middleware
//normal middleware has 3 parameter , to distinguish with errorMidd..it has 4 parameters
export const errorMiddleware=(err,req,res,next)=>{
    err.message=err.message || "Internam Server Error";
    err.statusCode=err.statusCode || 500;

    console.log(err);

    /*what is the error message*/
    if(err.code===11000){
        const statusCode=400;
        const message=`Duplicate Field Value Entered`;
        err=new ErrorHandler(message,statusCode)
    }

    if(err.name==="JsonWebTokenError"){
        const statusCode=400;
        const message=`Json Web Token is invalid. Try again.`;
        err=new ErrorHandler(message,statusCode)
    }

    if(err.name==="TokenExpiredError"){
        const statusCode=400;
        const message=`Json Web Token is expired. Try again.`;
        err=new ErrorHandler(message,statusCode)
    }
    if(err.name==="CastError"){
        const statusCode=400;
        const message=`Resources not found. Invalid: ${err.path}`;
        err=new ErrorHandler(message,statusCode) 
    }

    //we will get an arr of errors try to convert to str and return
    const errorMessage=err.errors
    ?Object.values(err.errors).   //if errmsg is arr convert to str else 
    map((error)=>error.message).  // return single message
    join(" "):err.message;

    return res.status(err.statusCode).json({
        success:false,
        message:errorMessage,
    })
}
export default ErrorHandler;