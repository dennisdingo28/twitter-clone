import React from 'react'
import Logo from '../ui/logo'
import Link from 'next/link'
import NavItem from '../ui/nav-item'
import { Home, Bookmark, Users2Icon, User } from 'lucide-react'
import UserControl from '../UserControl'
import { getAuthSession } from '@/lib/authOptions'
import SideTweet from './SideTweet'

const PanelSide = async () => {
  const session = await getAuthSession();
    
  return (
    <div className='pb-5 border-r h-full border-darkGray xl:flex-1'>
      <div className="flex h-[100%] flex-col items-center justify-between">
        <div className="flex flex-col items-center justify-end">
          <Link href="/" className='xl:flex items-center justify-end'>
            <Logo className='cursor-pointer w-[120px]'/>
          </Link>
          <div className="links flex flex-col items-center justify-center xl:items-baseline gap-5">
              <NavItem icon={<Home size={30}/>} label='Home' link="/"/>
              <NavItem icon={<Bookmark size={30}/>} label='Bookmarks' link="/bookmarks"/>
              <NavItem icon={<Users2Icon size={30}/>} label='Communities' link="/communities"/>
              <NavItem icon={<User size={30}/>} label='Profile' link={`${encodeURIComponent(String(session?.user?.name))}`}/>
          </div>
          <div className="sm:pr-1 sm:w-full">
            <SideTweet user={session?.user}/>
          </div>
        </div>
        <div className="justify-self-end">
          <UserControl/>
        </div>
      </div>
    </div>
  )
}

export default PanelSide
