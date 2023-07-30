import Header from '@/components/TweetPage/Header'
import TweetContainer from '@/components/TweetPage/TweetContainer'
import React from 'react'

const TweetPage = () => {
  return (
    <div className='border-r border-darkGray h-[100%] p-3'>
        <Header/>
        <TweetContainer/>
    </div>
  )
}

export default TweetPage