import prismadb from "@/lib/db";
import { SignUpValidator } from "@/validators";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest){
    try{
        const payload = await req.json();
        console.log(payload);
        
        SignUpValidator.parse(payload);
        
        //check if alredy exists

        const existingUsername = await prismadb.user.findUnique({
            where:{
                username:payload.username,
            }
        })
        const existingEmail = await prismadb.user.findUnique({
            where:{
                email:payload.email,
            }
        })
        if(existingUsername){
            return new NextResponse(`Username ${payload.username} is already taken !`,{status:400});
        }
        if(existingEmail)
            return new NextResponse(`Email ${payload.email} is already taken !`,{status:400});

        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(payload.password,salt);
        payload.password = hashedPassword;

        const newUser = await prismadb.user.create({data:payload});
        console.log(newUser);
        
        return NextResponse.json({msg:"Account was successfully created !"},{status:200});
    }catch(err){
        console.log(err);
        if(err instanceof ZodError)
            return new NextResponse("Invalid payload format. Pleaset try again later.",{status:400});
        return new NextResponse("Something went wrong while trying to access your account.",{status:500});
    }
}


export async function GET(req:NextRequest){
    try{
        const Url = new URL(req.url);
        const username = Url.searchParams.get("username");
        const usernameIncluded = Url.searchParams.get("usernameIncluded");

        if(username){
            const user = await prismadb.user.findFirst({
                where:{
                    username
                }
            });
            return NextResponse.json({msg:"User",user,ok:true},{status:200});

        }else if(usernameIncluded){
            const users = await prismadb.user.findMany({
                where:{
                    username:{
                        contains:usernameIncluded || "",
                    }
                }
            });
            return NextResponse.json({msg:"the user",users,ok:true},{status:200});
        }
        else{
            
            const allUsers = await prismadb.user.findMany({
                include:{
                    tweets:true,
                }
            });            

            return NextResponse.json({msg:"All users",users:allUsers,ok:true},{status:200});
        }
        
    }catch(err){
        return new NextResponse("Something went wrong while trying to fetch the users.",{status:500});
    }
}