import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/db";

export async function POST(req: NextRequest){
    try{
        const payload = await req.json();

        const newComment = await prismadb.comment.create({
            data:{
                tweetId:payload.tweetId,
                userId:payload.userId,
                comment:payload.commentValue
            }
        });

        return NextResponse.json({msg:"Successfully replied to the tweet.",newComment},{status:200});
    }catch(err){
        return new NextResponse("Something went wrong while trying to reply the tweet.");
    }
}