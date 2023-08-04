"use client"

import { Following, Tweet } from "@prisma/client";
import { useEffect, useState } from "react";
import qs from "query-string";
import { toast } from "react-hot-toast";
import axios from "axios";
import Tweets, { TweetProps } from "../Tweets";
import Paragraph from "../ui/paragraph";

interface ContentProps {
    followers: Following[] | null;
}

const Content: React.FC<ContentProps> = ({followers}) => {
    const [followingUserTweets,setFollowingUserTweets] = useState<any>([]);
    const [loading,setLoading] = useState<boolean>(false);
    console.log("fut",followingUserTweets);
    
    useEffect(()=>{
        async function getAllFollowingTweets(){
            try{
                setLoading(true);
                followers?.forEach(async (follower) => {
                    const queryUrl = qs.stringifyUrl({
                        url:"/api/tweet",
                        query:{
                            userId:follower.followingUserId,
                        }
                    });
                    const res = await axios.get(queryUrl);;
                    if(!res.data.ok)
                        throw new Error("Something went wrong. Please try again later!");
                    setFollowingUserTweets((prev: any)=>{
                        return [
                            ...prev,
                            ...res.data.tweets,
                        ]
                    })
                })
                setLoading(false);
                
            }catch(err){
                toast.error((err as Error).message);
                setLoading(false);
            }
        }
        getAllFollowingTweets();
    },[]);

  return (
    <div>
        {followingUserTweets.map((tweet: any)=>(
            <Paragraph>{tweet.tweetDescription}</Paragraph>
        ))}
    </div>
  )
}

export default Content