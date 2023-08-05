import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest, {params}:{params:{id: string}}){
    try{
        const communityId = params.id
    }catch(err){
        return new NextResponse("Something went wrong. Please try again later.",{status:500});
    }
}