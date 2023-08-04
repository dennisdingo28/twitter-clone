import ContentTabs from "@/components/HomePage/ContentTabs"
import Header from "@/components/HomePage/Header"
import Tweets from "@/components/Tweets"
import TweetsContainer from "@/components/TweetsContainer"
import Paragraph from "@/components/ui/paragraph"
import { getAuthSession } from "@/lib/authOptions"
import prismadb from "@/lib/db"
import { Comment, Tweet, User } from "@prisma/client"
import Link from "next/link"
import { Suspense } from "react"

const FollowingTweets = async () => {
    const session = await getAuthSession();
    const userFollowingUsers = await prismadb.following.findMany({
        where:{
            userId:session?.user?.id,
        }
    });
    


    const followersTweets = userFollowingUsers.map(async(follower)=>{
        const userTweets = await prismadb.tweet.findMany({
            where:{
                userId:follower.followingUserId,
            },
            include:{
                user:true,
                comments:true,
            }
        });
        console.log("ut",userTweets);
        
       return {
        ...userTweets,
       }
    })
    const tweets = await Promise.all(followersTweets);
    const updatedTweets = [];

    for(let i =0;i<tweets.length;i++){
      updatedTweets.push(tweets[i][i]);
    }
    

  return (
    <div className="border-r border-darkGray flex-1">
      <div className="content">
        <Link href="/"><Paragraph className="font-bold text-lg p-3">Home</Paragraph></Link>
      </div>
      <ContentTabs/>
      <div className="p-3 border-b border-darkGray">
        <Header/>
      </div>
      <Suspense fallback={<p className="text-center mt-4 font-bold text-[1.1em]">Loading the tweeets...</p>}>
            <Tweets tweets={updatedTweets}/>
      </Suspense>
    </div>
  )
}

export default FollowingTweets