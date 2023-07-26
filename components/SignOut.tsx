"use client";
import { signOut } from "next-auth/react";
import Button from "./ui/button";

const SignOut = () => {
  return (
    <Button onClick={()=>signOut()}>sign out</Button>
  )
}

export default SignOut;