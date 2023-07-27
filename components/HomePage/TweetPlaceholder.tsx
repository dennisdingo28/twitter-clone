"use client"

import { Image } from "lucide-react"
import Button from "../ui/button"
import { useState } from "react"


const TweetPlaceholder = () => {
    const [postValue,setPostValue] = useState("");
  return (
    <div className="">
        <input value={postValue} onChange={(e)=>setPostValue(e.target.value)} className='mb-4 bg-transparent outline-none px-1 py-2 w-full' placeholder='What is happening?!'/>
        <div className="flex justify-between">
            <div className="">
                <Image size={40} className="text-lightBlue text-sm hover:bg-[#031019] cursor-pointer rounded-full p-2"/>
            </div>
            <Button className={`rounded-xl py-1 px-3 ${postValue.trim()==='' ? "bg-darkBlue text-gray-400 pointer-events-none":""}`}>Tweet</Button>
        </div>
    </div>
  )
}

export default TweetPlaceholder