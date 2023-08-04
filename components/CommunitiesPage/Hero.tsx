import React from 'react'
import Paragraph from '../ui/paragraph'
import Button from '../ui/button'

const Hero = () => {
  return (
    <div className='mt-6'>
        <div className="flex items-center justify-between">
            <Paragraph className='text-[1.2em] font-extrabold max-w-[200px]'>
                Discover new Communities
            </Paragraph>
            <Button className='rounded-full p-1 whitespace-nowrap'>
                Create Community
            </Button>
        </div>
        
    </div>
  )
}

export default Hero