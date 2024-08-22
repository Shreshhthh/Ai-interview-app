import  bcrypt from 'bcrypt';
import { connectDb } from "../../../config/connectDb";
import UserModel from "../../../utils/models"
import {createToken} from "../../../utils/createToken"

export async function POST(request){
    try {
       await  connectDb();
        const {email, username, password} = await request.json()

        const userByEmail = await UserModel.findOne({email:email})

        if(userByEmail){
            return Response.json({success:false, message:"user already exists"})
        }

        const userByUsername = await UserModel.findOne({username:username})
        if(userByUsername){
            return Response.json({success:false, message:"username already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new UserModel({email:email, username:username, password:hashedPassword})
        const token = createToken(user._id)
        await user.save()
        return Response.json({success:true, message:"user created successfully" , user:{
            ...user._doc , password:""
    },token:token},{status:201})
        
    } catch (error) {
        
    }


}