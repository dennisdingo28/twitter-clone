"use client";

import {useForm} from "react-hook-form";
import FormInput from "../ui/formInput";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { toast } from "react-hot-toast";
import { SignInValidator, SignInRequest } from "@/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


interface LoginFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const LoginForm: React.FC<LoginFormProps> = ({setOpen}) => {
  const router = useRouter();
  const [showErrorMessage,setShowErrorMessage] = useState<boolean>(false);

  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver:zodResolver(SignInValidator),
    defaultValues:{
      identifier:"",
      password:"",
    }
  });
  console.log(errors);
  const handleLogin = async (data: SignInRequest)=>{
    try{
      const signInResponse = await signIn("credentials",{...data,redirect:false})   
      if(signInResponse?.error){
        throw new Error("Something went wrong. Please try again later!");
      }  
      
      router.push("/");
    }catch(err){
      toast.error("Cannot login. Please try again later!");
    }
    setTimeout(()=>{
      setOpen(false);
    },1200);
  }

  useEffect(()=>{
    if(Object.keys(errors).length>0){
      setShowErrorMessage(true)
      const timer = setTimeout(() => {
        setShowErrorMessage(false);
      }, 2100);

      return () => clearTimeout(timer);
    }
  },[errors]);

    return (
    <form onSubmit={handleSubmit(data=>handleLogin(data))}>
        <div className="flex flex-col gap-3">
          <FormInput name="username or email" registerName="identifier" placeholder="username / email" show={showErrorMessage} errMessage={errors.identifier?.message || ""} register={register}/>
          <FormInput name="password" placeholder="password" show={showErrorMessage} errMessage={errors.password?.message || ""} register={register}/>
        </div>
        <div className="flex mt-5 flex-col gap-2 justify-center mb-6">
            <Button variant={"default"} className="w-[100%] rounded-sm p-2 cursor-pointer">Continue</Button>
            <Button variant={"outline"}>Forgot password ?</Button>
        </div>
    </form>
  )
}

export default LoginForm