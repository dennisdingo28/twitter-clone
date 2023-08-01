"use client"
import Button from "../ui/button";
import { User } from "@prisma/client"
import UserSettingsModal from "./UserSettingsModal";
import { useState } from "react";

interface UserSettingsProps {
    user: User;
}

const UserSettings: React.FC<UserSettingsProps> = ({user}) => {
    const [isOpen,setIsOpen] = useState<boolean>(false);

    const handleClose = () =>{
        setIsOpen(false);
    }

    return (
    <div>
        <UserSettingsModal user={user} open={isOpen} handleClose={handleClose}/>
        <Button onClick={()=>setIsOpen(true)} className="bg-transparent text-white font-bold border border-darkGray py-2 px-5 rounded-full duration-150 hover:bg-[rgba(255,255,255,.1)]">Edit Profile</Button>
    </div>
  )
}

export default UserSettings

