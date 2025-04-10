import mongoose from "mongoose";
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
    verificationExpire:Date,
    resetPasswordToken:String,
    resetPasswordExpire:Date,   
},
{
timestamps:true
}
);
// 129 will generate a five digit number
userSchema.methods.generateVerifivationCode=function(){
 function generateRandomFiveDigitNumber(){
    const firstDigit=Math.floor(Math.random()*9)+1;//1-9 not 0
    const remainingDigits=Math.floor(Math.random()*10000).toString().padEnd(4,0);//maxlen=4 
    //A string to convert into a number.
    // 4 +"9671"="49671"  
    return parseInt(firstDigit+remainingDigits);
}
const verificationCode=generateRandomFiveDigitNumber();
this.verificationCode=verificationCode;
this.verificationExpire=Date.now()+15*60*1000;//15min
return verificationCode;
}
export const User=mongoose.model("User",userSchema);