"use client"

import { useMutation } from "@tanstack/react-query"
import Button from "../ui/button"
import { User as SessionUser } from "next-auth"
import { User, Tweet, Following } from "@prisma/client"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Loader2Icon } from "lucide-react"

interface FollowUserProps {
    sessionUser: SessionUser | undefined;
    user: User & {
        tweets: Tweet[],
        following: Following[],
        followers: Following[],
    };
}

const FollowUser:React.FC<FollowUserProps> = ({sessionUser,user}) => {
    const router = useRouter();

    console.log(sessionUser?.id,user);
    const alreadyFollowing = user.followers.filter(follower=>follower.userId===sessionUser?.id);
    
    const {mutate:followUser, isLoading} = useMutation({
        mutationFn: async ()=>{
            if(!alreadyFollowing || alreadyFollowing.length===0)
                await axios.post(`/api/follow`,{
                    sessionUserId:sessionUser?.id,
                    userId: user.id,
                });
            else{
                await axios.delete(`/api/follow/${alreadyFollowing[0].id}`,)
            }
        },
        onSuccess:()=>{
            if(!alreadyFollowing || alreadyFollowing.length===0)
                toast.success(`Following ${user.username}`);
            else
                toast.success(`User "${user.username}" was unfollowed`);

            setTimeout(()=>{
                router.refresh();
            },410);
        },
        onError:(err: any)=>{
            console.log("err",err);
               
            toast.error("Something went wrong. Please try again later.")
        },
    })

  return (
    <div className="flex items-center gap-2">
        <Loader2Icon size={17} className={`${isLoading ? "opacity-100 animate-spin z-0":"opacity-0 -z-10"}`}/>
        <Button onClick={()=>followUser()} className={`py-2 px-5 rounded-full bg-white border border-white text-black font-semibold hover:bg-[#D7DBDC] duration-150 ${isLoading && "bg-[#b0b0b0] pointer-events-none"} ${alreadyFollowing && alreadyFollowing.length>0 && "bg-transparent text-white hover:bg-[rgba(255,255,255,.1)]"}`}>{alreadyFollowing && alreadyFollowing.length>0 ? "Following":"Follow"}</Button>
    </div>
  )
}

export default FollowUser