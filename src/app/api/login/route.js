import UserModel from "../../../utils/models";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {connectDb} from "../../../config/connectDb"
import {createToken} from "../../../utils/createToken"
import { NextRequest } from "next/server";



export async function POST(request){
    try {
        await connectDb()
        const {email, password} = await request.json();
        const user  = await UserModel.findOne({email:email});

        if(!user){
            return Response.json({success:false,message: "User not found"});
        }

        const matchedPassword= await bcrypt.compare(password, user.password);

        if(!matchedPassword){
            return Response.status(401).json({
                success: false,
                message: "Invalid password"
            })
        }

        const token = createToken(user._id,Response);

        return Response.json({success:true, token:token})

    } catch (error) {
        console.log(error.message);
        Response.json({success:false, message:"Internal server error"})
    }
}

