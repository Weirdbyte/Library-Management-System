import nodeMailer from "nodemailer"
export const sendEmail=async({sendEmail,subject,message})=>{
const transporter=nodeMailer.createTransport({
    host:process.env.SMTP_HOST,
    service:process.env.SMTP_SERVICE,
    port: process.env.SMTP_MAIL,
    auth:{
        user:process.env.SMTP_MAIL,
        pass:process.env.SMTP_PASSWORD,
    },
});
const mailOptions={
from :process.env.SMTP_MAIL,
to:sendEmail,
subject,
html:message,
}
await transporter.sendMail(mailOptions);
}
