import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/db";

export async function PATCH(req: NextRequest,{params}:{params:{id: string}}){
    try{
        const newUserProps = await req.json();
        console.log(newUserProps);
        
        await prismadb.user.updateMany({
            where:{
                id: params.id,
            },
            data:{
                ...newUserProps,
            }
        });
    }catch(err){
        console.log(err);
        
        return new NextResponse("Something went wrong while updating the user. Please try again later!", {status:500});
    }
}