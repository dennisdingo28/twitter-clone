import Image from "next/image";

interface UserImageProps {
    imgUrl: string;
}

const UserImage: React.FC<UserImageProps> = ({imgUrl}) => {
  return <Image src={imgUrl} width={45} height={45} alt="profile image" className="rounded-full object-cover"/>
}

export default UserImage