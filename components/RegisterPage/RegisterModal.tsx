"use client";

import {useState} from "react";
import Modal from '../ui/Modal'
import Link from "next/link";
import RegisterForm from "./RegisterForm";

const RegisterModal: React.FC = () => {
    const [open,setOpen] = useState<boolean>(true);
    const onClose = () =>{
        setOpen(false);
        window.location.reload();
      }
  return (
    <Modal isOpen={open} onClose={onClose} setOpen={setOpen} modalTitle='Connect to Twitter' modalDescription="or">
        <RegisterForm/>
        <small className="text-start whitespace-nowrap">Already have an account? <Link href={"/login"} className="underline text-lightBlue">Sign in</Link></small>
    </Modal>
  )
}

export default RegisterModal