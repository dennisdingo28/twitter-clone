import { BookmarkValidator } from "@/validators";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest){
    try{
        const payload = await req.json();

        BookmarkValidator.parse(payload);

        
    }catch(err){
        if(err instanceof ZodError){
            return new NextResponse(err.issues[0].message,{status:400})
        }
        return new NextResponse("Something went wrong. Please try again later!");        
    }
}