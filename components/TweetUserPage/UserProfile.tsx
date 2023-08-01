import Image from "next/image"
import UserImage from "../ui/user-image"
import Button from "../ui/button"
import ProfileDescription from "./ProfileDescription"
import { User } from "@prisma/client"
import UserSettings from "./UserSettings"
import { getAuthSession } from "@/lib/authOptions"

interface UserProfileProps {
  user: User;
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
              <div className="">
                <Button className="py-2 px-5 rounded-full bg-white text-black font-semibold hover:bg-[#D7DBDC] duration-150">Follow</Button>
              </div>
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
