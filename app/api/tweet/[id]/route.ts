import prismadb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, {params}:{params:{id: string}}){
    try{
        const newTweetProps = await req.json();
        console.log(newTweetProps);
        
        await prismadb.tweet.updateMany({
            where:{
                id: params.id,
            },
            data:{
                ...newTweetProps
            }
        });

        return NextResponse.json({msg:"Tweet was successfully updated",ok:true},{status:200});
    }catch(err){
      
        return new NextResponse("Something went wrong. Please try again later!");
    }
}