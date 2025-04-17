import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        select:false,//this will not be get when u get your user
    },
    role:{
        type:String,
        enum:["Admin","User"],
        default:"User",
    },
    accountVerified:{
        type:Boolean,
        default:false
    },
    borrowedBooks:[
        {
            bookId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Borrow"
            },
            returned:{
                type:Boolean,
                default:false,
            },
            bookTitle:String,
            borrowDate:Date,
            dueDate:Date,
        },

    ],
    avatar:{
        public_id:String,
        url: String,
    },

    verificationCode:Number,
    verificationCodeExpire:Date,
    resetPasswordToken:String,
    resetPasswordExpire:Date,   
},
{
timestamps:true
}
);


userSchema.methods.generateVerificationCode=function(){
    const firstDigit=Math.floor(Math.random()*9)+1;  //1-9 not 0
    const remainingDigits=Math.floor(Math.random()*10000).toString().padEnd(4,0);//maxlen=4   
    const verificationCode = parseInt(firstDigit+remainingDigits);  // 4 +"9671"="49671"
    this.verificationCode=verificationCode;
    this.verificationCodeExpire=Date.now()+15*60*1000;  //15min
    return verificationCode;
}

userSchema.methods.generateToken=function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET_KEY,{ // sign(id,secret,options)
        expiresIn:process.env.JWT_EXPIRES,
    });
    return token;
}

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15*60*1000; //15min
    return resetToken;
}

export const User=mongoose.model("User",userSchema);