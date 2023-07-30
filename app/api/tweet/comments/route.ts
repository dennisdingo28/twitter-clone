import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { CommentValidator } from "@/validators";
import { ZodError } from "zod";

export async function POST(req: NextRequest){
    try{
        const payload = await req.json();
        
        CommentValidator.parse(payload);

        const newComment = await prismadb.comment.create({
            data:{
                tweetId:payload.tweetId,
                userId:payload.userId,
                comment:payload.comment
            }
        });

        return NextResponse.json({msg:"Successfully replied to the tweet.",newComment},{status:200});
    }catch(err){
        console.log(err);
        
        if(err instanceof ZodError){
            return new NextResponse(err.issues[0].message,{status:400})
        }
        return new NextResponse("Something went wrong while trying to reply the tweet.",{status:500});
    }
}