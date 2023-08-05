"use client"

import { useMutation } from "@tanstack/react-query"
import Button from "../ui/button"
import { toast } from "react-hot-toast"
import axios from "axios"

interface JoinCommunityProps {
    id: string;
    userId: string;
}

const JoinCommunity: React.FC<JoinCommunityProps> = ({id,userId}) => {
    
    const {mutate: joinCommunity,isLoading} = useMutation({
        mutationFn: async()=>{
            await axios.patch(`/api/community/${id}`,{
                users:""
            });
        },
        onSuccess:()=>{
            toast.success("Successfully joined the community.");
        },
        onError:()=>{
            toast.error("Something went wrong. Please try again later!");
        }
    })
    return (
    <div className="">
        <Button onClick={()=>joinCommunity()} className="rounded-full py-1 px-4">Join</Button>
    </div>
  )
}

export default JoinCommunity