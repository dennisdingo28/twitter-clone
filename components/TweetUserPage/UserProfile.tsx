import Image from "next/image"
import UserImage from "../ui/user-image"
import { Settings2 } from "lucide-react"
import Button from "../ui/button"
import ProfileDescription from "./ProfileDescription"

const UserProfile = () => {
  return (
    <div className="">
        <div className="">
          <Image src={"/twitterHeaderImage.jpg"} width={200} height={200} className="w-full min-h-[120px] h-full object-cover" alt="header profile"/>
        </div>
        <div className="p-2 flex justify-between">  
            <UserImage imgUrl="/defaultProfile.png" className="rounded-full -mt-20 w-[100px] h-[100px] xs:w-[115px] xs:h-[115px] sm:w-[130px] border-[3px] border-black sm:h-[130px]"/>
          <div className="flex items-center gap-3">
            <div className="border border-darkGray p-2 rounded-full hover:bg-[#181919] duration-150 cursor-pointer">
              <Settings2 size={18}/>
            </div>
            <Button className="py-2 px-5 rounded-full bg-white text-black font-semibold hover:bg-[#D7DBDC] duration-150">Follow</Button>
          </div>
        </div>
        <div className="">
          <ProfileDescription/>
        </div>
    </div>
  )
}

export default UserProfile
