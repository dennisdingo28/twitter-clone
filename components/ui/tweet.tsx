import { Tweet, User, Comment } from "@prisma/client"
import Paragraph from "./paragraph";
import UserImage from "./user-image";
import Image from "next/image";
import TweetInteractions from "../TweetInteractions";
import { getAuthSession } from "@/lib/authOptions";
import Link from "next/link";
import prismadb from "@/lib/db";
import Bookmark from "../BookmarksPage/Bookmark";

interface TweetProps {
    tweet: (Tweet & {
        user: User | null;
        comments: Comment[];
    })
}

function formatElapsedTime(createdAt: Date): string {
    const currentTime = new Date();
    const createdAtTime = new Date(createdAt);
    const elapsedTimeMilliseconds = currentTime.getTime() - createdAtTime.getTime();
  
    if (elapsedTimeMilliseconds < 60000) { // Less than a minute
      return "Just now";
    } else if (elapsedTimeMilliseconds < 3600000) { // Less than an hour
      const minutes = Math.floor(elapsedTimeMilliseconds / 60000);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (elapsedTimeMilliseconds < 86400000) { // Less than a day
      const hours = Math.floor(elapsedTimeMilliseconds / 3600000);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (elapsedTimeMilliseconds < 2629800000) { // Less than a month
      const days = Math.floor(elapsedTimeMilliseconds / 86400000);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (elapsedTimeMilliseconds < 31557600000) { // Less than a year
      const months = Math.floor(elapsedTimeMilliseconds / 2629800000);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(elapsedTimeMilliseconds / 31557600000);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
}
  

const Tweet: React.FC<TweetProps> = async ({tweet}) => {
    const session = await getAuthSession();
    const targetUser = await prismadb.user.findUnique({
        where:{
            id:session?.user?.id,
        },
        include:{
            bookmarks:true,
        }
    });
    const elapsedTimeString = formatElapsedTime(tweet.createdAt);

    const userAlreadyBookmarked = targetUser?.bookmarks.filter(bookmark=>bookmark.tweetId===tweet.id);
    return <div className="flex gap-2 border-b border-b-darkGray p-3 hover:bg-[#080808] cursor-pointer duration-150">
            <UserImage imgUrl={String(tweet.user?.imageUrl)} link={`/${encodeURIComponent(String(tweet.user?.username))}`} className="w-[40px] h-[40px]"/>
            <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                    <Link href={`/${encodeURIComponent(String(tweet.user?.username))}`} className="flex flex-col gap-1 sm:flex-row justify-center group">
                        <div className="flex items-center gap-1">
                            <Paragraph className="font-bold text-[1em] group-hover:underline">{tweet.user?.username}</Paragraph>
                            <Paragraph className="text-[#71767B] truncate max-w-fit">@{tweet.user?.username.split(" ")[0]}{tweet.user?.username.split(" ")[1]}</Paragraph>
                        </div>
                        <Paragraph className="text-sm text-darkGray">{elapsedTimeString}</Paragraph>
                    </Link>
                    <div className="">
                        <Bookmark bookmarkId={userAlreadyBookmarked && userAlreadyBookmarked.length>0 ? userAlreadyBookmarked[0].id : ""} userId={session?.user?.id.toString()} tweetId={tweet.id} isBookmarked={userAlreadyBookmarked && userAlreadyBookmarked.length>0 ? true:false}/>
                    </div>
                </div>
                <Link href={`/${encodeURIComponent(String(tweet.user?.username))}/${tweet.id}`}>
                    <div className="">
                        <Paragraph className="text-[1em] font-normal font-sans">{tweet.tweetDescription}</Paragraph>
                        
                        {tweet.uploadUrl.trim().length>0 && <div className="flex justify-center items-center">
                        <Image src={tweet.uploadUrl} width={250} height={250} className="object-cover" alt="user upload"/>
                        </div> }
                    </div>
                    
                </Link> 
                <div className="tweetInteractions mt-3">
                    <TweetInteractions tweet={tweet} user={session?.user}/>
                </div>
            </div>
        </div>
}

export default Tweet