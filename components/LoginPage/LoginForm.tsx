"use client";

import {useForm} from "react-hook-form";
import FormInput from "../ui/formInput";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { SignInValidator, SignInRequest } from "@/validators";
import loginAccount from "@/lib/loginAccount";

const LoginForm = () => {
  const [showErrorMessage,setShowErrorMessage] = useState<boolean>(false);

  const {register, handleSubmit, formState:{errors}} = useForm({
    defaultValues:{
      identifier:"",
      password:"",
    }
  });
    return (
    <form onSubmit={handleSubmit(data=>loginAccount(data))}>
        <div className="flex flex-col gap-3">
          <FormInput name="username or email" placeholder="username / email" show={errors.identifier ? true:false} errMessage={errors.identifier?.message || ""} register={register}/>
          <FormInput name="password" placeholder="password" show={errors.password ? true:false} errMessage={errors.password?.message || ""} register={register}/>
        </div>
    </form>
  )
}

export default LoginForm