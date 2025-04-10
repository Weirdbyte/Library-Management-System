import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import {User} from "../models/userModels.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendVerificationCode } from "../utils/sendVerificationCode.js";


//creating a register function
export const register =catchAsyncErrors(async(req,res,next)=>{
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){ //if any of this is missing
            return next(new ErrorHandler("please enter all fields.",400));
        }
        //check if user is already registerd
        const isRegistered=await User.findOne({email,accountVerified:true})
        if(isRegistered){
            return next(new ErrorHandler("user already exists.",400));
        }
        //if no.of wrong attempts exceed , then try after some time
        const registerationAttemptsByUser=await User.find({
            email,
            accountVerified:false,
        });
        if(registerationAttemptsByUser.length>=5){
            return next(
                new ErrorHandler("You have exceeded the number of registration attempts. please contact support",400)
            )
        }
        //hash the password
        if(password.length<8 || password.length>16){
            return next(new ErrorHandler("password must be between 8 and 16 characters.",400));
        }
        const hashedPassword=await bcrypt.hash(password,10);//10
        //creating a user
        const user=await User.create({
            name,
            email,
            password:hashedPassword,
        })
        //generating the verification code and send to email(expiry time is also generated)
        const verificationCode=await user.generateVerificationCode();
        await user.save();
        sendVerificationCode(verificationCode,email,res);
    }catch(error){
    next(error);
}
});
