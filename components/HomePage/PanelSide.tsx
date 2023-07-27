import React from 'react'
import Logo from '../ui/logo'
import Link from 'next/link'
import NavItem from '../ui/nav-item'
import { Home,Search, Bookmark, Users2Icon, User } from 'lucide-react'
import UserControl from '../UserControl'
import Button from '../ui/button'

const PanelSide = () => {
  return (
    <div className='pb-5 border-r h-full lg:pr-6 border-darkGray flex-1'>
      <div className="flex h-[100%] flex-col items-center justify-between">
        <div className="">
          <Link href="/" className='xl:flex items-center justify-center'>
            <Logo className='cursor-pointer w-[120px]'/>
          </Link>
          <div className="links flex flex-col items-center justify-center xl:items-baseline gap-5">
            <div className="cursor-pointer hover:bg-[rgba(255,255,255,.2)] rounded-full p-3 duration-200 xl:rounded-full">
              <NavItem icon={<Home size={30}/>} label='Home' link="/"/>
            </div>
            <div className='cursor-pointer hover:bg-[rgba(255,255,255,.2)] rounded-full p-3 duration-200'>
              <NavItem icon={<Search size={30}/>} label='Explore' link="/"/>
            </div>
            <div className='cursor-pointer hover:bg-[rgba(255,255,255,.2)] rounded-full p-3 duration-200'>
              <NavItem icon={<Bookmark size={30}/>} label='Bookmarks' link="/"/>
            </div>
            <div className='cursor-pointer hover:bg-[rgba(255,255,255,.2)] rounded-full p-3 duration-200'>
              <NavItem icon={<Users2Icon size={30}/>} label='Communities' link="/"/>
            </div>
            <div className='cursor-pointer hover:bg-[rgba(255,255,255,.2)] rounded-full p-3 duration-200'>
              <NavItem icon={<User size={30}/>} label='Profile' link="/"/>
            </div>
          </div>
          <Button className='w-full p-3 rounded-full mt-5'>Tweet</Button>
        </div>
        
        <div className="justify-self-end">
          <UserControl/>
        </div>
      </div>
    </div>
  )
}

export default PanelSide
