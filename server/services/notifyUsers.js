import cron from "node-cron";
import { Borrow } from "../models/borrowModel.js";
import { sendEmail } from './../utils/sendEmail.js';
import { Book } from "../models/bookModel.js";
import { dueTodayReminderEmailTemplate } from "../utils/emailTemplates.js";

export const notifyUsers = ()=>{
    cron.schedule("*/30 * * * *", async()=>{
        try {
            const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const borrowers = await Borrow.find({
                dueDate: { $lt: oneDayAgo }, 
                returnDate: null,
                notified:false,
            });

            for(const element of borrowers){
                if(element.user || element.user.email) {
                    const borrowedBook = await Book.findOne({ _id: element.book });
                    const message = dueTodayReminderEmailTemplate(element.user.name, borrowedBook.title);
                    sendEmail({
                        email: element.user.email,
                        subject: "Book Return remainder : Booknest",
                        message,
                    });
                    element.notified = true;
                    await element.save();
                    console.log("Email sent to user:", element.user.email);
                }
            }
        } catch (error)  {
            console.error("Some error occured in notifying users:", error);
        }
    })
}