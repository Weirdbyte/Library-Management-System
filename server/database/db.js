import mongoose, {connect} from "mongoose"
export const connectDB = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "LIBRARY_MANAGEMENT_SYSTEM"
        });
        console.log(`Database connected successfully...`);
    } catch (err) {
        console.log("Error connecting to database", err);
    }
}