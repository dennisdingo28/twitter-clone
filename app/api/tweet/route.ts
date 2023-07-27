import prismadb from "@/lib/db";
import { TweetValidator } from "@/validators";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest){
    try{
        const newTweet = await req.json();

        //validating tweet object keys 
        TweetValidator.parse(newTweet);

        const tweet = await prismadb.tweet.create({data:{
            ...newTweet
        }});
        
        return NextResponse.json({msg:"Tweet was successfully created!",ok:true},{status:200});
    }catch(err){
        console.log(err);
        if(err instanceof ZodError){
            return new NextResponse(err.issues[0].message)
        }
        return new NextResponse("Something went wrong. Please try again later!",{status:500});
    }
}