"use client";
import { signOut } from "next-auth/react";
import Button from "./ui/button";
import { HTMLAttributes } from "react";

interface SignOutButton extends HTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode;
}

const SignOut: React.FC<SignOutButton> = ({children,className,...props}) => {
  return (
    <Button className={className} onClick={()=>signOut()} {...props}>{children}</Button>
  )
}

export default SignOut;