"use client"
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import { HTMLAttributes } from "react";

interface UserImageProps extends HTMLAttributes<HTMLImageElement>{
    imgUrl: string;
}

const UserImage: React.FC<UserImageProps> = ({imgUrl,className}) => {
  return <Image src={imgUrl} width={50} height={40} alt="profile image" className={cn("rounded-full object-cover",className)}/>
}

export default UserImage