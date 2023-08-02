import Paragraph from "./paragraph";
import UserImage from "./user-image";
import Link from "next/link";

interface UserProfileProps {
    id: string;
    userImage: string;
    username: string;
    twitterUsername: string;
}

const UserProfile: React.FC<UserProfileProps> = ({id,userImage,username,twitterUsername}) => {
  return (
    <Link href={`/${encodeURIComponent(username)}`} key={id} className="flex items-center gap-2 p-4 hover:bg-[#16181c] cursor-pointer duration-150">
            <UserImage imgUrl={userImage}/>
            <div className="">
                <Paragraph className="font-bold">{username}</Paragraph>
                <Paragraph className="text-gray-600 text-[.9em]">@{username.split(" ")[0]}{username.split(" ")[1]}</Paragraph>
            </div>
    </Link>
  )
}

export default UserProfile