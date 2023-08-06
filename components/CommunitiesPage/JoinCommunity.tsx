"use client"

import { useMutation } from "@tanstack/react-query"
import Button from "../ui/button"
import { toast } from "react-hot-toast"
import axios from "axios"
import { User, UserCommunity } from "@prisma/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface JoinCommunityProps {
    id: string;
    userId: string;
    user: User;
    users: UserCommunity[] | [];
}

const JoinCommunity: React.FC<JoinCommunityProps> = ({id,userId,user,users}) => {
    const router = useRouter();
    
    const userAlreadyJoined = users.some(currentUser=>currentUser.userId===user.id);
    const [alreadyJoined,setAlreadyJoined] = useState(userAlreadyJoined);
    
    const {mutate: joinCommunity,isLoading} = useMutation({
        mutationFn: async()=>{
            if(!alreadyJoined){
                await axios.post(`/api/community/${id}/join`,{
                    userId:userId,
                });
                setAlreadyJoined(true);
            }else{
                await axios.post(`/api/community/${id}/leave`,{
                    userId:userId,
                });
                setAlreadyJoined(false);
            }
        },
        onSuccess:()=>{
            if(!alreadyJoined){
                toast.success("Successfully joined the community.");
            }
            else{
                toast.success("Successfully left the community.");
            }
            router.refresh();
        },
        onError:()=>{
            toast.error("Something went wrong. Please try again later!");
            setAlreadyJoined(userAlreadyJoined);

        }
    })
    return (
    <div className="">
        {!alreadyJoined ? (
            <div className="flex items-center gap-2">
                <Button onClick={()=>joinCommunity()} className={`rounded-full py-1 px-4 ${isLoading && "bg-darkBlue pointer-events-none"}`}>{isLoading ? "Joining...":"Join"}</Button>
                {isLoading && <Loader2 size={17} className="animate-spin"/>}
            </div>
        ):(
            <div className="flex items-center gap-2">
                <Button onClick={()=>joinCommunity()} className={`rounded-full py-1 px-4 ${isLoading && "bg-darkBlue pointer-events-none"}`}>{isLoading ? "Leaving community...":"Leave community"}</Button>
                {isLoading && <Loader2 size={17} className="animate-spin"/>}
            </div>
        )}
    </div>
  )
}

export default JoinCommunity;