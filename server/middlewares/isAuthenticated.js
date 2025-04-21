import { catchAsyncErrors } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModels.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("User is not authenticated",400))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decoded);
    req.user = await User.findById(decoded._id);
    next();
}) 

export const isAuthorized=(...roles)=>{
return (req,res,next)=>{
if(!roles.includes(req.user.role)){
   return next(
    new ErrorHandler(
        `User with this role (${req.user.role}) now allowed to access this resource.`,400)
   ) ;
}
next();
};
};