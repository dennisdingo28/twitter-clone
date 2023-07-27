"use client"
import Image from "next/image";

interface UserImageProps {
    imgUrl: string;
}

const UserImage: React.FC<UserImageProps> = ({imgUrl}) => {
  return <Image src={imgUrl} width={50} height={40} alt="profile image" className="rounded-full object-cover"/>
}

export default UserImage