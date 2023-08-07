import { NextRequest, NextResponse } from "next/server";
import { FollowValidator } from "@/validators";
import { ZodError } from "zod";
import prismadb from "@/lib/db";

export async function POST(req: NextRequest){
    try{
        const payload = await req.json();

        FollowValidator.parse(payload);

        const newFollowingInstance = await prismadb.following.create({
            data:{
                userId: payload.sessionUserId,
                followingUserId: payload.userId,
            }
        });

        return NextResponse.json({msg:"New following instance",ok:true},{status:200});

    }catch(err){
        if(err instanceof ZodError){
            return new NextResponse(err.issues[0].message,{status:400})
        }
        return new NextResponse("Something went wrong while trying to follow the user. Please try again later.",{status:500});
    }
}