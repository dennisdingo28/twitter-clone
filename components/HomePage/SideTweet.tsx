"use client"

import { TwitterIcon } from "lucide-react"

import Button from "../ui/button"
import { useState } from "react"
import SideTweetModal from "./SideTweetModal"
import { User } from "next-auth"

interface SideTweetProps {
  user: User | undefined;
}

const SideTweet: React.FC<SideTweetProps> = ({user}) => {
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const onClose = ()=>{
        setIsOpen(false);
    }

  return (
   <div className="w-full">
      <SideTweetModal user={user} isOpen={isOpen} onClose={onClose}/>
     <Button onClick={()=>setIsOpen(true)} className='w-fit mx-auto p-3 rounded-full mt-5 sm:hidden'>
        <TwitterIcon size={17}/>
    </Button>
    <Button onClick={()=>setIsOpen(true)} className="w-full p-3 rounded-full mt-5 hidden sm:block">Tweet</Button>
   </div>
  )
}

export default SideTweet