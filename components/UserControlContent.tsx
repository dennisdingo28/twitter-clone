"use client"
import Popover from './ui/popover'
import React from 'react'
import UserImage from './ui/user-image'
import LabelInfo from './ui/label-info'
import Paragraph from './ui/paragraph'
import { User } from 'next-auth'
import { useState } from "react";
import { Settings2 } from 'lucide-react'

interface UserControlProps {
    user: User;
}
const UserControlContent: React.FC<UserControlProps> = ({user}) => {
    const [popoverOpen,setPopoverOpen] = useState<boolean>(false);
  return (
    <div className="cursor-pointer relative">

        <div className={`mb-3 absolute left-[50%] -translate-x-[50%] -top-40 ${!popoverOpen ? "opacity-0 -z-10":"opacity-100 z-10"} bg-black duration-150`}>
            <Popover label={user.name || ""}/>
        </div>

        <div onClick={()=>setPopoverOpen(!popoverOpen)} className="group hover:bg-[rgba(255,255,255,.1)] rounded-full p-3 duration-200 relative xl:flex xl:gap-3 xl:items-center">
            <UserImage imgUrl={user.image || ""} className="w-[40px] h-[40px]"/>
            <LabelInfo className="-z-10 mt-1 absolute group-hover:opacity-100 opacity-0 group-hover:z-10 left-[50%] -translate-x-[50%] px-1 rounded-sm text-sm bg-slate-600 duration-200 xl:hidden" label={"Accounts"}/>
            <div className="hidden xl:block">
                <Paragraph className="font-bold truncate max-w-[160px]">{user.name}</Paragraph>
                <Paragraph className="text-[#6b7075] truncate max-w-[150px]">@{user.name}</Paragraph>
            </div>
            <Settings2 size={25} className='hidden xl:block'/>
        </div>
    </div>
  )
}

export default UserControlContent