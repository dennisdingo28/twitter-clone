import React from 'react'
import Logo from '../ui/logo'
import Link from 'next/link'
import NavItem from '../ui/nav-item'
import { Home,Search, Bookmark, Users2Icon, User } from 'lucide-react'
import UserControl from '../UserControl'
import Button from '../ui/button'
import { getAuthSession } from '@/lib/authOptions'
import { TwitterIcon } from 'lucide-react'
import SideTweet from './SideTweet'

const PanelSide = async () => {
  const session = await getAuthSession();
  
  return (
    <div className='pb-5 border-r h-full border-darkGray flex-1'>
      <div className="flex h-[100%] flex-col items-center justify-between">
        <div className="flex flex-col items-center justify-center">
          <Link href="/" className='xl:flex items-center justify-center'>
            <Logo className='cursor-pointer w-[120px]'/>
          </Link>
          <div className="links flex flex-col items-center justify-center xl:items-baseline gap-5">
            <div className="cursor-pointer hover:bg-[rgba(255,255,255,.2)] rounded-full p-3 duration-200 xl:rounded-full">
              <NavItem icon={<Home size={30}/>} label='Home' link="/"/>
            </div>
            <div className='cursor-pointer hover:bg-[rgba(255,255,255,.2)] rounded-full p-3 duration-200'>
              <NavItem icon={<Search size={30}/>} label='Explore' link="/explore"/>
            </div>
            <div className='cursor-pointer hover:bg-[rgba(255,255,255,.2)] rounded-full p-3 duration-200'>
              <NavItem icon={<Bookmark size={30}/>} label='Bookmarks' link="/bookmarks"/>
            </div>
            <div className='cursor-pointer hover:bg-[rgba(255,255,255,.2)] rounded-full p-3 duration-200'>
              <NavItem icon={<Users2Icon size={30}/>} label='Communities' link="/communities"/>
            </div>
            <div className='cursor-pointer hover:bg-[rgba(255,255,255,.2)] rounded-full p-3 duration-200'>
              <NavItem icon={<User size={30}/>} label='Profile' link={`${session?.user?.name}`}/>
            </div>
          </div>
          <SideTweet user={session?.user}/>
         
        </div>
        
        <div className="justify-self-end">
          <UserControl/>
        </div>
      </div>
    </div>
  )
}

export default PanelSide
