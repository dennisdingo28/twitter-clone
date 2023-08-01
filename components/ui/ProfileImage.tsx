import UserImage from "./user-image";
import { Upload } from "lucide-react";
import Paragraph from "./paragraph";


interface ProfileImageProps {
    imgUrl: string;
    label: string;
}
const ProfileImage:React.FC<ProfileImageProps> = ({imgUrl,label}) => {
  return (
      <div className="relative cursor-pointer flex flex-col justify-center items-center">
            <UserImage imgUrl={imgUrl} className="w-[80px] h-[80px]"/>
            <Upload size={20} className="absolute right-0 top-0"/>
            <Paragraph className="text-sm font-semibold">{label}</Paragraph>
          
      </div>
  )
}

export default ProfileImage
