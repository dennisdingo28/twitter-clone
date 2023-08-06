import prismadb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest, {params}:{params:{id: string}}){
    try{
        const payload = await req.json();
        const communityId = params.id

        await prismadb.community.updateMany({
            where:{
                id:communityId,
            },
            data:{
                ...payload,
            }
        });

        return NextResponse.json({msg:"Community was successfully updated!",ok:true},{status:200});
    }catch(err){
        console.log("comerror",err);
        
        return new NextResponse("Something went wrong. Please try again later.",{status:500});
    }
}