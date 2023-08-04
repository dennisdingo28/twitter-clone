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

export async function GET(req: NextRequest){
    try {
        const Url = new URL(req.url);

        const userId = Url.searchParams.get("userId");

        if(userId){
            const userTweets = await prismadb.tweet.findMany({
                where:{
                    userId:userId,
                },
                include:{
                    user:true,
                    comments:true,
                }
            });

            return NextResponse.json({msg:"Successfully retrieved all the user tweets.",tweets:userTweets,ok:true},{status:200});
        }
    } catch (err) {
        return new NextResponse("Something went wrong. Please try again later!");
    }
}