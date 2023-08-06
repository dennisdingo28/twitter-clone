"use client"

import { useMutation } from "@tanstack/react-query"
import Button from "../ui/button"
import { toast } from "react-hot-toast"
import axios from "axios"
import { User } from "@prisma/client"
import { useState } from "react"

interface JoinCommunityProps {
    id: string;
    userId: string;
    user: User;
    users: User[] | [];
}

const JoinCommunity: React.FC<JoinCommunityProps> = ({id,userId,user,users}) => {
    const [currentUsers,setCurrentUsers] = useState(users);
    const userAlreadyJoined = currentUsers.some(user=>user.id===userId);

    const {mutate: joinCommunity,isLoading} = useMutation({
        mutationFn: async()=>{
            if(!userAlreadyJoined){
                setCurrentUsers([user,...currentUsers]);
                await axios.patch(`/api/community/${id}`,{
                    users:[user,...currentUsers]
                });
            }else{
                //leave
            }
            
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

export default JoinCommunity;