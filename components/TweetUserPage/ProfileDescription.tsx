import Paragraph from "../ui/paragraph"
import {PiSuitcaseSimpleLight} from "react-icons/pi";
import {CiLocationOn} from "react-icons/ci";
import { Following, Tweet, User } from "@prisma/client";
import { PiBrowser } from "react-icons/pi";
import Link from "next/link";

interface UserProfileDescriptionProps {
    user: User & {
        tweets: Tweet[],
        following: Following[],
        followers: Following[],
    };
}

const ProfileDescription:React.FC<UserProfileDescriptionProps> = ({user}) => {
  
    return (
    <div className="p-2 flex flex-col gap-3 border-b border-darkGray">
        <div className="">
            <Paragraph className="font-bold text-[1.2em]">{user.username}</Paragraph>
            <Paragraph className="text-[1em] text-gray-500">@{user.username.split(" ")[0]}{user.username.split(" ")[1]}</Paragraph>
        </div>
        <div className="">
            {user.bio}
        </div>
        <div className="flex gap-3">
                <div className="flex items-center gap-2">
                    <PiSuitcaseSimpleLight className="text-gray-400 w-[20px] h-[20px]"/>
                    <span className="text-gray-500">{user.occupation || "unknown"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <CiLocationOn className="text-gray-400 w-[20px] h-[20px]"/>
                    <span className="text-gray-500">{user.location || "unknown"}</span>
                </div>  
                <div >
                    <Link href={user.website} className="flex items-center gap-2">
                        <PiBrowser className="text-gray-400 w-[20px] h-[20px]"/>
                        <span className="text-lightBlue">{user.website || "unknown"}</span>
                    </Link>
                </div> 
        </div>
        <div className="">
            <div className="flex items-center gap-3">
                <Paragraph className="font-bold text-white">{user.following.length} <span className="text-gray-500 font-normal">Following</span></Paragraph>
                <Paragraph className="font-bold text-white">{user.followers.length} <span className="text-gray-500 font-normal">Followers</span></Paragraph>
            </div>
        </div>
    </div>
  )
}

export default ProfileDescription
