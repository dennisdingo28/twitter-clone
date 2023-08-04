import Hero from '@/components/BookmarksPage/Hero';
import Paragraph from '@/components/ui/paragraph'
import { getAuthSession } from '@/lib/authOptions'
import React from 'react'

const Bookmarks = async() => {
    const session = await getAuthSession();

  return (
    <div className=''>
        <div className="mb-5 p-3">
            <Paragraph className='font-bold text-[1.1em]'>Bookmarks</Paragraph>
            <Paragraph className='text-[.8em] text-[#71767b]'>@{session?.user?.name?.split(" ")[0]}{session?.user?.name?.split(" ")[1]}</Paragraph>
        </div>
        <Hero/>
    </div>
  )
}

export default Bookmarks