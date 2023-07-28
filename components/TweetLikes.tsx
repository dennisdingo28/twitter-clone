"use client";

import IconInteraction from "./ui/IconInteraction";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import likeTweet from "@/lib/likeTweet";
import { Tweet, User as UserClient } from "@prisma/client"
import { User } from "next-auth"
import { Heart } from "lucide-react";

interface TweetLikeProps {
    tweet: Tweet & {
      user: UserClient;
    };
    user: User | undefined;
}

const TweetLikes:React.FC<TweetLikeProps> = ({tweet,user}) => {
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

  return (
    <>
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
    </>
  )
}

export default TweetLikes