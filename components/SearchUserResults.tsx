"use client"

import { User } from "@prisma/client";
import { HTMLAttributes } from "react";
import Paragraph from "./ui/paragraph";
import UserProfile from "./ui/userProfile";


interface SearchUserResultsProps extends HTMLAttributes<HTMLDivElement>{
    data: Array<User>;
}

const SearchUserResults: React.FC<SearchUserResultsProps> = ({data, className}) =>{
    
    return(
        <div className={className}>
           {data.length===0 ? (
            <Paragraph className="text-gray-500 text-center">Try searching for people, topics, or keywords</Paragraph>
           ):(
            <div className="flex flex-col">
                {data.map(user=>(
                    <UserProfile id={user.id} userImage={user.imageUrl} username={user.username} twitterUsername={"@"+user.username.split(" ")[0]+user.username.split(" ")[1]}/>
                ))}
            </div>
           )}
        </div>
    )
}

export default SearchUserResults;