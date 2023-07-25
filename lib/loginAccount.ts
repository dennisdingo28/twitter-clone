import { SignInRequest } from "@/validators";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

export default async function loginAccount(data: SignInRequest){
    const signInResponse = await signIn("credentials",{...data,redirect:false})   
    if(signInResponse?.error){
        toast.error(signInResponse.error)
    }else{
        toast.success("Successfully logged in !");
        setTimeout(()=>{
            window.location.reload();
        },1200);
    } 
}