"use client"
import { MessageSquare, Share, BarChart } from "lucide-react"
import IconInteraction from "./ui/IconInteraction"
import { User } from "next-auth"
import TweetLikes from "./TweetLikes";
import { Tweet, User as UserClient } from "@prisma/client"


interface TweetInteractionsProps {
  tweet: Tweet & {
    user: UserClient;
  };
  user: User | undefined;
}

const TweetInteractions:React.FC<TweetInteractionsProps> = ({tweet,user}) => {
  

  
  //end like tweet

  return (
    <div className="flex items-center justify-between">
        <IconInteraction className="group-hover:text-lightBlue duration-150" handleClick={()=>{}} textData="4,757" icon={<MessageSquare size={40} className="text-[#9CA093] group-hover:text-lightBlue group-hover:bg-[#0C2839] rounded-full p-2 duration-150"/>}/>
        <IconInteraction className="group-hover:text-[#00BA7C] duration-150" handleClick={()=>{}} textData="4,125" icon={<Share size={40} className="text-[#9CA093] group-hover:text-[#00BA7C] group-hover:bg-[#062E21] rounded-full p-2 duration-150"/>}/>
        <TweetLikes tweet={tweet} user={user}/>
        <IconInteraction className="group-hover:text-lightBlue duration-150" handleClick={()=>{}} textData="7,632" icon={<BarChart size={40} className="text-[#9CA093] group-hover:text-lightBlue group-hover:bg-[#0C2839] rounded-full p-2 duration-150"/>}/>
    </div>
  )
}

export default TweetInteractions
