"use client";

import {useState} from "react";
import Modal from '../ui/Modal'
import Link from "next/link";
import LoginForm from "./LoginForm";

const LoginModal: React.FC = () => {
    const [open,setOpen] = useState<boolean>(true);
    const onClose = () =>{
      setOpen(false);
      window.location.href="/";
    }
  return (
    <Modal isOpen={open} setOpen={setOpen} onClose={onClose} modalTitle='Connect to Twitter' modalDescription="or">
        <LoginForm setOpen={setOpen}/>
       
        <small className="text-white text-start whitespace-nowrap">Not have an account? <Link href={"/register"} className="underline text-lightBlue">Create account</Link></small>
    </Modal>
  )
}

export default LoginModal