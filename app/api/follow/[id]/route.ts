import prismadb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, {params}:{params:{id: string}}){
    try{
        const followingInstanceId = params.id;

        const followingInstance = await prismadb.following.delete({
            where:{
                id: followingInstanceId,
            }
        });

        if(!followingInstance)
            throw new Error("Cannot find any following instance with the provided id.");
        
        return NextResponse.json({msg:"Successfully unfollwed",ok:true},{status:200})
    }catch(err){
        
        return new NextResponse((err as Error).message);
    }
}