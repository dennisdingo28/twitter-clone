"use client"

import { signIn } from "next-auth/react"
import Button from "./ui/button"
import {Chrome,GithubIcon} from "lucide-react"
import { useRouter } from "next/navigation"

const LoginProviders = () => {
  const router = useRouter();
  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-4">
        <Button onClick={()=>{
          try{
            signIn("google",{redirect:false});
            
            setTimeout(()=>{
              router.push('/');
            },1200);
          }catch(err){
            console.log("google err",err);
          }
          }} variant={"authProvider"} className="flex items-center justify-center gap-2 w-full">Connect with Google<Chrome size={25}/></Button>
        <Button onClick={()=>{
          try{
            signIn("github");
            
            setTimeout(()=>{
              router.push('/');
            },1200);
          }catch(err){
            console.log("github err",err);
          }
          }}  variant={"authProvider"} className="flex items-center justify-center gap-2 w-full"><GithubIcon size={25}/> Register with Github</Button>
    </div>
  )
}

export default LoginProviders