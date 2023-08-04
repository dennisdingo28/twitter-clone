import prismadb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest,{params}:{params:{id: string}}){
    try{
        const bookmarkId = params.id;

        await prismadb.bookmark.delete({
            where:{
                id:bookmarkId,
            }
        });
        return NextResponse.json({msg:"Unbookmarked",ok:true},{status:200});
    }catch(err){
        return new NextResponse("Something went wrong. Please try again later!",{status:500})
    }
}