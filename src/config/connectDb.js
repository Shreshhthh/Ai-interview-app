import mongoose from "mongoose";

export const connectDb = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.DB_URI)
        if(connection){
            console.log("Connected to MongoDB")
        }
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}