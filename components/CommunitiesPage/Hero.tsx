"use client"
import React, { useState } from 'react'
import Paragraph from '../ui/paragraph'
import Button from '../ui/button'
import CreateCommunityModal from './CreateCommunityModal'

const Hero = () => {
  const [isOpen,setIsOpen] = useState<boolean>(false);
  const [communityImage,setCommunityImage] = useState<string>("");

  const onUpload = (result: any) =>{
    console.log(result);
    
    setCommunityImage(result.info.secure_url)
  }

  return (
    <div className='mt-4 p-3'>
        <CreateCommunityModal onUpload={onUpload} communityImage={communityImage} isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
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