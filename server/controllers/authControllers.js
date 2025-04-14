import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import {User} from "../models/userModels.js";
import bcrypt from "bcrypt";
import { sendVerificationCode } from "../utils/sendVerificationCode.js";
import { sendToken } from "../utils/sendToken.js";


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
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
        })
        //generating the verification code and send to email(expiry time is also generated)
        const verificationCode = await user.generateVerificationCode();
        await user.save();
        sendVerificationCode(verificationCode,email,res);
    }catch(error){
    next(error);
}
});


export const verifyOTP = catchAsyncErrors(async(req,res,next) =>{
    // console.log('Headers:', req.headers);
    // console.log('Body:', req.body);
    
    const {email,otp} = req.body;
    if(!email || !otp){ 
        return next(new ErrorHandler("Email or Otp is missing.",400));
    } 

    try {
        const userAttempts = await User.find({
            email,
            accountVerified: false,
        }).sort({ createdAt: -1 });

        if (userAttempts.length === 0) {
            return next(new ErrorHandler("No user found with this email.", 404));
        }

        const user = userAttempts[0];  // Get the most recent attempt
        if(userAttempts.length > 1){   // if there are multiple attempts, delete the older ones
            await User.deleteMany({        
                _id : { $ne: user._id },
                email,
                accountVerified: false,
            })
        }

        //check otp
        if(user.verificationCode !== Number(otp)){
            return next(new ErrorHandler("Invalid OTP",400));
        }

        const currentTime = Date.now();
        const otpExpiryTime = user.verificationCodeExpire.getTime();
        if(currentTime > otpExpiryTime){
            return next(new ErrorHandler("OTP expired",400));
        } 

        //if correctotp and not expired
        user.accountVerified = true;
        user.verificationCode = null;
        user.verificationCodeExpire = null;
        await user.save({validateModifiedOnly:true});

        sendToken(user, 200 , "Account verified successfully", res);

    }catch (error) {
        return next(new ErrorHandler("Internal server error",500));
        
    }
})



export const login = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please enter all the required fields",404));
    }

    const user = await User.findOne({email , accountVerified:true}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",400));
    }
    const isPassMatched = await bcrypt.compare(password,user.password);
    if(!isPassMatched){
        return next(new ErrorHandler("Invalid email or password",400));
    }

    sendToken(user,200,"Login Successful",res);
})


export const logout = catchAsyncErrors(async(req,res,next)=>{
    res.status(200)
    .cookie("token","", {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    .json({
        success: true,
        message: "LogOut Successfull.",
    })
})


export const getUser = catchAsyncErrors(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    })
})