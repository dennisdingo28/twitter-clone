import prismadb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest,{params}:{params:{id: string}}){
    try{
        const payload = await req.json();
        const communityId = params.id;


        const communityToJoin = await prismadb.community.findUnique({
            where:{
                id:params.id,
            }
        });

        if(!communityToJoin){
            return new NextResponse("Community was not found. Please try again later.",{status:400});
        }

        const userToJoin = await prismadb.user.findUnique({
            where:{
                id:payload.userId,
            }
        });

        if(!userToJoin){
            return new NextResponse("User was not found. Please try again later.",{status:400});
        }

        await prismadb.userCommunity.deleteMany({
            where:{
                userId:payload.userId,
                communityId:params.id,
            }
        })
        return NextResponse.json({msg:"Successfully left the community.",ok:true,},{status:200});
    }catch(err){
        return new NextResponse("Something went wrong. Please try again later!",{status:500});
    }
}