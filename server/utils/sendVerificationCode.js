import { generateVerificationOtpEmailTemplate } from "./emailTemplates.js";
import { sendEmail } from "./sendEmail.js";

//in sendVerificationCode function pass 3 args
export async function sendVerificationCode(verificationCode,email,res){
    try{
    const message=generateVerificationOtpEmailTemplate(verificationCode);
    sendEmail({
        email,
        subject:"verifivation code (Bookworm Library Management System)",
        message,
    })
    res.status(200).json({
        success:true,
        message:"verification code sent successfully.",
    })
    }
    catch(error){
        return res.status(500),json({
            success:false,
            message:"verification code failed to send,",
        })
    }
}