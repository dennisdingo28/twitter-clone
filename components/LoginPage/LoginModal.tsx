"use client";

import {useState} from "react";
import Modal from '../ui/Modal'
import Button from "../ui/button";
import Link from "next/link";
import LoginForm from "./LoginForm";

const LoginModal: React.FC = () => {
    const [open,setOpen] = useState<boolean>(true);
    const onClose = () =>{
      setOpen(false);
      window.location.reload();
    }
  return (
    <Modal isOpen={open} setOpen={setOpen} onClose={onClose} modalTitle='Connect to Twitter' modalDescription="or">
        <LoginForm/>
        <div className="flex mt-5 flex-col gap-2 justify-center mb-6">
            <Button variant={"default"} className="w-[100%] rounded-sm p-2 cursor-pointer">Continue</Button>
            <Button variant={"outline"}>Forgot password ?</Button>
        </div>
        <small className="text-start whitespace-nowrap">Not have an account? <Link href={"/register"} className="underline text-lightBlue">Create account</Link></small>
    </Modal>
  )
}

export default LoginModal