import cron from "node-cron";
import { User } from "../models/userModels.js";

export const removeUnverifiedAcc = () => {
    cron.schedule("*/1 * * * *", async () => {
        try {
            const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000);
            await User.deleteMany({
                accountVerified: false,
                createdAt: { $lt: thirtyMinAgo },
            });
            console.log("Unverified accounts older than 30 days have been removed.");
        } catch (error) {
            console.error("Error removing unverified accounts:", error);
        }
    });
}