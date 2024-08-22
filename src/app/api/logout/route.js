import { cookies } from "next/headers";

export async function POST(request){
    try{
        const cookie= cookies().delete('ai-token');
        return Response.json({success:"true", message:"logged out successfully"})

    }catch(err){
        console.log(err);
    }
}