import Header from '@/components/TweetPage/Header'
import TweetPost from '@/components/TweetPage/TweetPost'
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

const TweetPage:React.FC<Params> = ({params:{profileName,tweetId}}) => {
  const decodedProfileName = decodeURIComponent(profileName)
  
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
