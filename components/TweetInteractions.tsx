"use client"
import { MessageSquare, Share, Heart, BarChart } from "lucide-react"
import IconInteraction from "./ui/IconInteraction"

const TweetInteractions = () => {
  return (
    <div className="flex items-center justify-between">
        <IconInteraction className="group-hover:text-lightBlue duration-150" handleClick={()=>{}} textData="4,757" icon={<MessageSquare size={30} className="text-[#9CA093] group-hover:text-lightBlue group-hover:bg-[#0C2839] rounded-full p-2 duration-150"/>}/>
        <IconInteraction className="group-hover:text-[#00BA7C] duration-150" handleClick={()=>{}} textData="4,125" icon={<Share size={30} className="text-[#9CA093] group-hover:text-[#00BA7C] group-hover:bg-[#062E21] rounded-full p-2 duration-150"/>}/>
        <IconInteraction className="group-hover:text-[#F91880] duration-150" handleClick={()=>{}} textData="15,152" icon={<Heart size={30} className="text-[#9CA093] group-hover:text-[#F91880] group-hover:bg-[#200914] rounded-full p-2 duration-150"/>}/>
        <IconInteraction className="group-hover:text-lightBlue duration-150" handleClick={()=>{}} textData="7,632" icon={<BarChart size={30} className="text-[#9CA093] group-hover:text-lightBlue group-hover:bg-[#0C2839] rounded-full p-2 duration-150"/>}/>
    </div>
  )
}

export default TweetInteractions
