"use client"
import {useForm} from "react-hook-form";
import Button from "../ui/button";
import {zodResolver} from "@hookform/resolvers/zod";
import { SignUpRequest, SignUpValidator } from "@/validators";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import createAccount from "@/lib/createAccount";
import FormInput from "../ui/formInput";
import { toast } from "react-hot-toast";

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
    mutationFn: async (data: SignUpRequest) => await createAccount(data),
    onSuccess:(data: any)=>{
        console.log("created",data);
        toast.success("created")
    },
    onError:(err: any)=>{
        console.log((err as Error).message);
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
            <FormInput name="username" placeholder="username" show={errors.username ? true:false} errMessage={errors.username?.message || ""} register={register}/>
            <FormInput name="email" placeholder="email" show={errors.email ? true:false} errMessage={errors.email?.message || ""} register={register}/>
            <FormInput name="password" placeholder="password" show={errors.password ? true:false} errMessage={errors.password?.message || ""} register={register}/>
        </div>
        <Button className="w-full mt-4 p-2 rounded-sm">Create account</Button>
    </form>
  )
}

export default RegisterForm