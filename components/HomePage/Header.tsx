import UserImage from '@/components/ui/user-image'
import { getAuthSession } from '@/lib/authOptions'
import React from 'react'
import { Audience } from './Audience';


const Header:React.FC = async () => {
  const session = await getAuthSession();
  return (
    <div className='flex gap-3'>
      <div className="">
        <UserImage imgUrl={String(session?.user?.image)}/>
      </div>
      <div className="">
          <Audience/>
          <input className='bg-transparent outline-none' placeholder='What is happening?!'/>
      </div>
          

    </div>
  )
}

export default Header