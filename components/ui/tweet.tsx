import { Tweet, User, Comment } from "@prisma/client"
import Paragraph from "./paragraph";
import UserImage from "./user-image";
import Image from "next/image";
import TweetInteractions from "../TweetInteractions";
import { getAuthSession } from "@/lib/authOptions";

interface TweetProps {
    tweet: (Tweet & {
        user: User | null;
        comments: Comment[];
    })
}

const Tweet: React.FC<TweetProps> = async ({tweet}) => {
    const session = await getAuthSession();

    
  return <div className="flex gap-2 border-b border-b-darkGray p-3 hover:bg-[#080808] cursor-pointer duration-150">
        <UserImage imgUrl={String(tweet.user?.imageUrl)} className="w-[40px] h-[40px]"/>
        <div className="w-full">
            <div className="flex gap-1 items-center">
                <Paragraph className="font-bold text-[1em]">{tweet.user?.username}</Paragraph>
                <Paragraph className="text-[#71767B]">@{tweet.user?.username.trim()}</Paragraph>
            </div>
            <div className="">
                <Paragraph className="text-[1em] font-normal font-sans">{tweet.tweetDescription}</Paragraph>
                
                {tweet.uploadUrl.trim().length>0 && <div className="flex justify-center items-center">
                <Image src={tweet.uploadUrl} width={250} height={250} className="object-cover" alt="user upload"/>
                </div> }
            </div>
            <div className="tweetInteractions mt-3">
                <TweetInteractions tweet={tweet} user={session?.user}/>
            </div>
        </div>
  </div>
}

export default Tweet