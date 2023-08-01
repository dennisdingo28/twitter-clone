import Paragraph from "../ui/paragraph"
import {PiSuitcaseSimpleLight} from "react-icons/pi";
import {CiLocationOn} from "react-icons/ci";

const ProfileDescription = () => {
  return (
    <div className="p-2 flex flex-col gap-3">
        <div className="">
            <Paragraph className="font-bold text-[1.2em]">Moldovan Dennis</Paragraph>
            <Paragraph className="text-[1em] text-gray-500">@MoldovanDennis</Paragraph>
        </div>
        <div className="">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur laborum rerum sapiente similique et quae. Ullam illum pariatur voluptas dolore rerum. Necessitatibus ea soluta quos.
        </div>
        <div className="flex gap-3">
            <div className="flex items-center gap-2">
                <PiSuitcaseSimpleLight className="text-gray-400 w-[20px] h-[20px]"/>
                <span className="text-gray-500">Media Personality</span>
            </div>
            <div className="flex items-center gap-2">
                <CiLocationOn className="text-gray-400 w-[20px] h-[20px]"/>
                <span className="text-gray-500">Dubai</span>
            </div>
        </div>
        <div className="">
            <div className="flex items-center gap-3">
                <Paragraph className="font-bold text-white">465 <span className="text-gray-500 font-normal">Following</span></Paragraph>
                <Paragraph className="font-bold text-white">7.4 <span className="text-gray-500 font-normal">Followers</span></Paragraph>
            </div>
        </div>
    </div>
  )
}

export default ProfileDescription
