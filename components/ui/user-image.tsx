"use client"
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import { HTMLAttributes } from "react";
import { useRouter } from "next/navigation";

interface UserImageProps extends HTMLAttributes<HTMLImageElement>{
  imgUrl: string;
  link?: string;
}

const UserImage: React.FC<UserImageProps> = ({imgUrl,link,className}) => {
  const router = useRouter();
  if(!link)
    return <Image quality={100} src={imgUrl} width={50} height={40} alt="profile image" className={cn("rounded-full object-cover",className)}/>
  return <Image quality={100} src={imgUrl} width={50} onClick={(e)=>{
    e.stopPropagation();
    router.push(`${link}`)}} height={40} alt="profile image" className={cn("rounded-full object-cover",className)}/>
}

export default UserImage