"use client";

import {useState} from "react";
import Modal from '../ui/Modal'
import Button from "../ui/button";
import Link from "next/link";

const LoginModal: React.FC = () => {
    const [open,setOpen] = useState<boolean>(true);
  return (
    <Modal isOpen={open} setOpen={setOpen} modalTitle='Connect to Twitter' modalDescription="or">
        <div className="">login inputs</div>
        <div className="flex flex-col gap-2 justify-center mb-6">
            <Button variant={"default"} className="w-[100%] rounded-sm p-2 cursor-pointer hover">Continue</Button>
            <Button variant={"outline"}>Forgot password ?</Button>
        </div>
        <small className="text-start whitespace-nowrap">Not have an account? <Link href={"/register"} className="underline text-lightBlue">Create account</Link></small>
    </Modal>
  )
}

export default LoginModal