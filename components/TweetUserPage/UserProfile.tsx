import Image from "next/image"
import UserImage from "../ui/user-image"
import ProfileDescription from "./ProfileDescription"
import { Following, Tweet, User } from "@prisma/client"
import UserSettings from "./UserSettings"
import { getAuthSession } from "@/lib/authOptions"
import FollowUser from "./FollowUser"

interface UserProfileProps {
  user: User & {
    tweets: Tweet[],
    following: Following[],
    followers: Following[],
  };
}

const UserProfile:React.FC<UserProfileProps> = async ({user}) => {
  const session = await getAuthSession();
  return (
    <div className="">
        <div className="">
          {user.headerProfileImage.trim()!=="" ? (
            <Image src={"/twitterHeaderImage.jpg"} width={200} height={200} className="w-full min-h-[120px] h-full object-cover" alt="header profile"/>
          ):(
            <div className="w-full min-h-[200px] max-h-[230px] h-full bg-[#333639]"></div>
          )}
        </div>
        <div className="p-2 flex justify-between">  
            <UserImage imgUrl={user.imageUrl} className="rounded-full -mt-20 w-[100px] h-[100px] xs:w-[115px] xs:h-[115px] sm:w-[130px] border-[3px] border-black sm:h-[130px]"/>
          <div className="flex items-center gap-3">
            {session?.user?.name===user.username ? (
              <UserSettings user={user}/>
            ):(
              <FollowUser sessionUser={session?.user} user={user}/>
            )}
            
          </div>
        </div>
        <div className="">
          <ProfileDescription user={user}/>
        </div>
    </div>
  )
}

export default UserProfile
