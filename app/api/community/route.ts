import prismadb from "@/lib/db";
import { CommunityValidator } from "@/validators";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest){
    try{
        const payload = await req.json();
        
        CommunityValidator.parse(payload);

        const community = await prismadb.community.create({
            data:{
                name:payload.communityName,
                imageUrl:payload.communityImage || "/community.png",
            }
        });

        return NextResponse.json({msg:"Community was successfully created.",community:community,ok:true},{status:200});

    }catch(err){
        if(err instanceof ZodError){
            return new NextResponse(err.issues[0].message,{status:400})
        }
        return new NextResponse("Something went wrong. Please try again later.",{status:500});
    }
}

export async function GET(req: NextRequest){
    try{
        const allCommunities = await prismadb.community.findMany();

        return NextResponse.json({msg:"All communities were retrieved.",communities:allCommunities,ok:true},{status:200});
    }catch(err){
        return new NextResponse("Something went wrong. Please try again later.",{status:500});
    }
}