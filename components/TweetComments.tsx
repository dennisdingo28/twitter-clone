"use client"
import { Tweet, User as UserClient, Comment } from "@prisma/client"
import { User } from "next-auth"
import { MessageSquare} from "lucide-react"
import IconInteraction from "./ui/IconInteraction";
import TweetCommentsModal from "./TweetCommentsModal";
import { useState } from "react";

interface TweetCommentProps {
    tweet: (Tweet & {
      user: UserClient | null;
      comments: Comment[];
    });
    user: User | undefined;
}

const TweetComments:React.FC<TweetCommentProps> = ({tweet,user}) => {
    const [isOpen,setIsOpen] = useState<boolean>(false);

  return (
    <div className="">
        <TweetCommentsModal tweet={tweet} user={user} open={isOpen} handleClose={()=>setIsOpen(false)}/>
        <IconInteraction className="group-hover:text-lightBlue duration-150" handleClick={()=>{setIsOpen(true)}} textData={tweet.comments.length.toString()} icon={<MessageSquare size={40} className="text-[#9CA093] group-hover:text-lightBlue group-hover:bg-[#0C2839] rounded-full p-2 duration-150"/>}/>
    </div>
        
   
  )
}

export default TweetComments

