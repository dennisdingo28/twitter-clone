import Header from '@/components/TweetPage/Header'
import TweetPost from '@/components/TweetPage/TweetPost'
import Paragraph from '@/components/ui/paragraph'
import { getAuthSession } from '@/lib/authOptions'
import prismadb from '@/lib/db'
import getAllUsers from '@/lib/getAllUsers'
import { Tweet, User } from '@prisma/client'
import React from 'react'

type Params = {
  params:{
    profileName: string;
    tweetId: string;
  }
}

export const revalidate = 60;

const TweetPage:React.FC<Params> = async ({params:{profileName,tweetId}}) => {
  const session = await getAuthSession();

  const decodedProfileName = decodeURIComponent(profileName)

  const targetTweet = await prismadb.tweet.findUnique({
    where:{
      id: tweetId,
    }
  });
  const targetUser = await prismadb.user.findUnique({
    where:{
      username:decodedProfileName,
    }
  });

  if(!targetUser){
    return <Paragraph className="text-center text-[1.2em] font-bold mt-6">Cannot find any user</Paragraph>
  }

  if(!targetTweet){
    return <Paragraph className="text-center text-[1.2em] font-bold mt-6">Cannot find any tweet</Paragraph>
  }

  const alreadyVisitTweet = targetTweet.visits.some(visit=>visit===session?.user?.id.toString());

  if(!alreadyVisitTweet){
    await prismadb.tweet.updateMany({
      where:{
        id: tweetId,
      },
      data:{
        visits:[...targetTweet.visits,session?.user?.id!]
      }
    })
  }
 

  return (
    <div className='border-r border-darkGray h-[100%]'>
        <Header label={"Tweet"}/>
        <TweetPost accountName={decodedProfileName} tweetId={tweetId}/>
    </div>
  )
}
export default TweetPage

export async function generateStaticParams(){
    const allUsers = await getAllUsers(); 

    if(!allUsers || allUsers.length===0)
      return [];

    return allUsers.users.map((user: User & {tweets: Tweet[]})=>{
      const encodedUsername = encodeURIComponent(user.username);
      user.tweets.map(tweet=>{
        return {
          profileName:encodedUsername,
          tweetId:tweet.id
        }
      })
    })
    
}
