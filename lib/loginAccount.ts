import { SignInRequest } from "@/validators";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

export default async function signInAccount(payload: SignInRequest){    
    const signInResponse = await signIn("credentials",{...payload,redirect:false})   
    if(signInResponse?.error){
        toast.error(signInResponse.error)
    }else{
        toast.success("Successfully logged in !");
        setTimeout(()=>{
            window.location.href='/';
        },1200);
    }    
}