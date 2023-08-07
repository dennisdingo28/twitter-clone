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
        <div className="max-w-[570px] w-full min-h-[120px] max-h-[270px]">
          {user.headerProfileImage.trim()!=="" ? (
            <Image src={user.headerProfileImage} priority width={548} height={200} className="min-h-[200px] max-h-[270px] w-full h-full object-cover" quality={100} alt="header profile"/>
          ):(
            <div className="w-full min-h-[200px] max-h-[230px] h-full bg-[#333639]"></div>
          )}
        </div>
        <div className="p-2 flex justify-between">  
          <Image width={105} height={70} quality={100} className="rounded-full -mt-[50px]" priority src={user.imageUrl} alt="header profile image"/>
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
