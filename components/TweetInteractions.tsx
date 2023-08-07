"use client"
import { Share, BarChart } from "lucide-react"
import IconInteraction from "./ui/IconInteraction"
import { User } from "next-auth"
import TweetLikes from "./TweetLikes";
import { Tweet, User as UserClient,Comment } from "@prisma/client"
import TweetComments from "./TweetComments";
import { toast } from "react-hot-toast";
import { useOrigin } from "@/hooks/useOrigin";

interface TweetInteractionsProps {
  tweet: (Tweet & {
    user: UserClient | null;
    comments: Comment[];
  });
  user: User | undefined;
}

const TweetInteractions:React.FC<TweetInteractionsProps> = ({tweet,user}) => {

  const origin = useOrigin();

  return (
    <div className="flex items-center justify-between">
      <div className="z-20">
        <TweetComments tweet={tweet} user={user}/>
      </div>
      <div className="z-20">
        <TweetLikes tweet={tweet} user={user}/>
      </div>
      <div className="z-20">
        <IconInteraction className="group-hover:text-lightBlue duration-150" handleClick={()=>{}} textData={tweet.visits.length.toString()} icon={<BarChart size={40} className="text-[#9CA093] group-hover:text-lightBlue group-hover:bg-[#0C2839] rounded-full p-2 duration-150"/>}/>
      </div>
      <div className="z-20">
        <Share onClick={async ()=>{

        const clipboard = await navigator.clipboard.writeText(`${origin}/${encodeURIComponent(String(tweet.user?.username))}/${tweet.id}`)
        toast.success("Successfully copied to clipboard!");
        }} size={40} className="text-[#9CA093] hover:text-lightBlue duration-150 p-2 hover:bg-[#0C2839] rounded-full"/>
      </div>
        
    </div>
  )
}

export default TweetInteractions
