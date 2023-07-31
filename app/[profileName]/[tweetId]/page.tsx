import Header from '@/components/TweetPage/Header'
import TweetPost from '@/components/TweetPage/TweetPost'
import React from 'react'

type Params = {
  params:{
    profileName: string;
    tweetId: string;
  }
}

const TweetPage:React.FC<Params> = ({params:{profileName,tweetId}}) => {
  const decodedProfileName = decodeURIComponent(profileName)
  
  return (
    <div className='border-r border-darkGray h-[100%]'>
        <Header/>
        <TweetPost accountName={decodedProfileName} tweetId={tweetId}/>
    </div>
  )
}

export default TweetPage