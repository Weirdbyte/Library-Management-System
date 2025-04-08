import mongoose, {connect} from "mongoose"
export const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"MERN LIBRARY MANAGEMENT SYSTEM"
    }).then(()=>{
        console.log(`Database connected successfully`);
    }).catch((err)=>{
        console.log("error connecting to database",err);
    })

}