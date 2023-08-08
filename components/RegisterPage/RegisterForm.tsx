"use client";
import {useForm} from "react-hook-form";
import Button from "../ui/button";
import {zodResolver} from "@hookform/resolvers/zod";
import { SignUpRequest, SignUpValidator } from "@/validators";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import createAccount from "@/lib/createAccount";
import FormInput from "../ui/formInput";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const RegisterForm = () => {
    const [showErrorMessage,setShowErrorMessage] = useState<boolean>(false);

    const {register, handleSubmit, formState:{errors}} = useForm({
      resolver:zodResolver(SignUpValidator),
      defaultValues:{
          username:"",
          email:"",
          password:"",
      }
    });
    console.log(errors);
  
  
  const {mutate:createUser, isLoading} = useMutation({
    mutationFn: async (data: SignUpRequest) => {
      await createAccount(data)
    },
    onSuccess:()=>{      
        toast.success("Account was successfully created!");
    },
    onError:(err: any)=>{
        toast.error(err.response.data)
    }
    })



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
    <form onSubmit={handleSubmit((data)=>createUser(data))}>
        <div className="flex flex-col gap-3">
            <FormInput name="username" placeholder="username" show={showErrorMessage} errMessage={errors.username?.message || ""} register={register}/>
            <FormInput name="email" placeholder="email" show={showErrorMessage} errMessage={errors.email?.message || ""} register={register}/>
            <FormInput name="password" placeholder="password" show={showErrorMessage} errMessage={errors.password?.message || ""} register={register}/>
        </div>
        <div className="flex items-center mt-4 gap-2">
          <Button className={`w-full p-2 rounded-sm ${isLoading && "pointer-events-none bg-darkBlue text-gray-300"}`}>Create account</Button>
          {isLoading && <Loader2 className="animate-spin text-white"/>}
        </div>
    </form>
  )
}

export default RegisterForm