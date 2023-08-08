"use client"
import React, { useState } from 'react'
import Paragraph from '../ui/paragraph'
import Button from '../ui/button'
import CreateCommunityModal from './CreateCommunityModal'

interface HeroProps{
  userId: string;
}

const Hero: React.FC<HeroProps> = ({userId}) => {
  const [isOpen,setIsOpen] = useState<boolean>(false);
  

  return (
    <div className='mt-4 p-3'>
        <CreateCommunityModal isOpen={isOpen} userId={userId.toString()} onClose={()=>setIsOpen(false)}/>
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2">
            <Paragraph className='text-[1.2em] text-center font-extrabold max-w-[200px]'>
                Discover new Communities
            </Paragraph>
            <Button onClick={()=>setIsOpen(true)} className='rounded-full py-1 px-2 whitespace-nowrap'>
                Create Community
            </Button>
        </div>
        
    </div>
  )
}

export default Hero