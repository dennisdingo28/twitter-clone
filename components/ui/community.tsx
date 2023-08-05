import { Community, User } from "@prisma/client"
import Image from "next/image";
import Paragraph from "./paragraph";

interface CommunityProps {
    community: Community & {
        users: User[],
    };
};

const Community: React.FC<CommunityProps> = ({community}) => {
    let membersMessage = "";
    if(community.users.length===0){
        membersMessage="members";
    }else if(community.users.length===1){
        membersMessage="member";
    }else{
        membersMessage="members"
    }
  return (
    <div className="flex gap-2 p-3 hover:bg-[#080808] duration-150 cursor-pointer">
        <div className="">
            <Image src={community.imageUrl} width={150} height={150} className="max-w-[150px] max-h-[150px] object-cover" quality={100} alt="communityImage"/>
        </div>
        <div className="">
            <Paragraph className="font-bold text-[1.02em]">{community.name}</Paragraph>
            <Paragraph className="font-bold flex items-center gap-1">
                {community.users.length}
                <span className="font-normal text-[.9em] text-gray-500">{membersMessage}</span>
            </Paragraph>
        </div>
    </div>
  )
}

export default Community