import UserImage from '@/components/ui/user-image'
import { getAuthSession } from '@/lib/authOptions'
import React from 'react'
import { Audience } from './Audience';
import TweetPlaceholder from './TweetPlaceholder';


const Header:React.FC = async () => {
  const session = await getAuthSession();
  return (
    <div className='flex gap-3'>
      <div className="  ">
        <UserImage imgUrl={String(session?.user?.image)} className="w-[43px] h-[40px]"/>
      </div>
      <div className="pb-2 w-full">
          <Audience/>
          <TweetPlaceholder user={session?.user}/>
      </div>
          

    </div>
  )
}

export default Header