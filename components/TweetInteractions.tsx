"use client"
import { MessageSquare, Share, Heart, BarChart } from "lucide-react"
import IconInteraction from "./ui/IconInteraction"
import { Tweet, User as UserClient } from "@prisma/client"
import { useEffect, useState } from "react"
import { User } from "next-auth"
import { useMutation } from "@tanstack/react-query"
import likeTweet from "@/lib/likeTweet"
import { useRouter } from "next/navigation"

interface TweetInteractionsProps {
  tweet: Tweet & {
    user: UserClient;
  };
  user: User | undefined;
}

const TweetInteractions:React.FC<TweetInteractionsProps> = ({tweet,user}) => {
  const router = useRouter();

  //like tweet
  const [tweetLikes,setTweetLikes] = useState<Array<string>>(tweet.likes);  
  const userLiked = tweetLikes.some((userId)=>userId===user?.id);

  useEffect(()=>{
    handleTweetLike();
  },[tweetLikes]);

  const {mutate:handleTweetLike, isLoading} = useMutation({
    mutationFn:async ()=>{
      await likeTweet(tweet.id,tweetLikes);
      return null;
    },
    onSuccess:()=>{
      router.refresh();
    },
    onError: ()=>{
      const filteredLikes = tweetLikes.filter(userId=>userId!==user?.id);
      setTweetLikes(filteredLikes);
    }
  });

  //end like tweet

  return (
    <div className="flex items-center justify-between">
        <IconInteraction className="group-hover:text-lightBlue duration-150" handleClick={()=>{}} textData="4,757" icon={<MessageSquare size={40} className="text-[#9CA093] group-hover:text-lightBlue group-hover:bg-[#0C2839] rounded-full p-2 duration-150"/>}/>
        <IconInteraction className="group-hover:text-[#00BA7C] duration-150" handleClick={()=>{}} textData="4,125" icon={<Share size={40} className="text-[#9CA093] group-hover:text-[#00BA7C] group-hover:bg-[#062E21] rounded-full p-2 duration-150"/>}/>
        <IconInteraction className={`group-hover:text-[#F91880] duration-150 ${userLiked && "text-[#F91880]"} ${isLoading && "pointer-events-none"}`} handleClick={()=>{
          if(userLiked){
            const filteredLikes = tweetLikes.filter(userId=>userId!==user?.id);
            setTweetLikes(filteredLikes);
           
          }else{
            setTweetLikes(prev=>{
              return [
                ...prev,
                String(user?.id)
              ]
            })
          }
        }} textData={String(tweetLikes.length)} icon={<Heart size={40} className={`text-[#9CA093] group-hover:text-[#F91880] group-hover:bg-[#200914] rounded-full p-2 duration-150 ${userLiked && "text-[#F91880]"}`}/>}/>
        <IconInteraction className="group-hover:text-lightBlue duration-150" handleClick={()=>{}} textData="7,632" icon={<BarChart size={40} className="text-[#9CA093] group-hover:text-lightBlue group-hover:bg-[#0C2839] rounded-full p-2 duration-150"/>}/>
    </div>
  )
}

export default TweetInteractions
