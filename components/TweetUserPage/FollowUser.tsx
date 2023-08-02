"use client"

import { useMutation } from "@tanstack/react-query"
import Button from "../ui/button"
import { User as SessionUser } from "next-auth"
import { User, Tweet, Following } from "@prisma/client"

interface FollowUserProps {
    sessionUser: SessionUser | undefined;
    user: User & {
        tweets: Tweet[],
        following: Following[],
        followers: Following[],
    };
}

const FollowUser:React.FC<FollowUserProps> = ({sessionUser,user}) => {
    console.log(sessionUser,user);
    
    const {mutate:followUser, isLoading} = useMutation({
        mutationFn: async ()=>{
            
        },
        onSuccess:()=>{
            
        },
        onError:()=>{

        },
    })

  return (
    <div className="">
        <Button onClick={()=>{}} className="py-2 px-5 rounded-full bg-white text-black font-semibold hover:bg-[#D7DBDC] duration-150">Follow</Button>
    </div>
  )
}

export default FollowUser