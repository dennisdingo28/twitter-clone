import prismadb from "@/lib/db";
import Paragraph from "../ui/paragraph";
import Tweet from "../ui/tweet";
import UserImage from "../ui/user-image";
import Image from "next/image";
import Link from "next/link";

interface TweetPostProps{
    accountName: string;
    tweetId: string;
}

const TweetPost:React.FC<TweetPostProps> = async ({accountName,tweetId}) => {

    const user = await prismadb.user.findFirst({
        where:{
            username: accountName,
        },
    })
    const tweet = await prismadb.tweet.findUnique({
        where:{
            id: tweetId,
        },
        include:{
            user:true,
            comments:{
                include:{
                    user:true,
                }
            },
        }
    });

    if(!user){
        return <Paragraph className="text-center text-[1.2em] font-bold mt-6">Cannot find any user with username {accountName}</Paragraph>
    }
    if(!tweet){
        return <Paragraph className="text-center text-[1.2em] font-bold mt-6">Cannot find any tweet with provided id {accountName}</Paragraph>
    }
    
        
    return (
    <div>
        <Tweet tweet={tweet}/>
        <div className="replySection flex flex-col">
            {tweet.comments.map(tweet=>(
                <Link href={`/${tweet.user.username}`}>
                    <div className="flex gap-3 border-b border-darkGray p-3 hover:bg-[#080808] cursor-pointer duration-150">
                        <div className="">
                            <UserImage imgUrl={tweet.user.imageUrl} className="w-[43px] h-[40px]"/>
                        </div>
                        <div className="">
                            <div className="flex gap-1 items-center">
                                <Paragraph className="font-bold text-[1em]">{tweet.user?.username}</Paragraph>
                                <Paragraph className="text-[#71767B]">@{tweet.user?.username.trim()}</Paragraph>
                            </div>
                            <div className="">
                                <Paragraph className="text-[1em] font-normal font-sans">{tweet.comment}</Paragraph>
                                
                                {tweet.uploadUrl && tweet.uploadUrl.trim().length>0 && <div className="flex justify-center items-center">
                                <Image src={tweet.uploadUrl} width={250} height={250} className="object-cover" alt="user upload"/>
                                </div> }
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default TweetPost