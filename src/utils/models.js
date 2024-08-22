import { match } from "assert";
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true,
    },
    email :{
        type: String,
        required: true,
        unique: true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/]
    },
    password:{
        type: String,
        required: true,
    }
})

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)
export default UserModel;