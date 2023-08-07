import ContentTabs from "@/components/HomePage/ContentTabs"
import Header from "@/components/HomePage/Header"
import Tweets from "@/components/Tweets"
import Loading from "@/components/ui/Loading"
import Paragraph from "@/components/ui/paragraph"
import { getAuthSession } from "@/lib/authOptions"
import prismadb from "@/lib/db"
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
                user:{
                  include:{
                    bookmarks:true,
                  }
                },
                comments:true,
            }
        });
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
      <Tweets tweets={updatedTweets}/>
    </div>
  )
}

export default FollowingTweets