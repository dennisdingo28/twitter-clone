import Button from '@/components/ui/button'
import Paragraph from '@/components/ui/paragraph'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 my-5'>
        <Paragraph className='text-[.8em] text-gray-600'>
            Hmm...this page doesn’t exist. Try searching for something else.
        </Paragraph>
        <Link href={"/"}>
            <Button className='text-[.8em] rounded-full p-2'>Back Home</Button>
        </Link>
    </div>
  )
}

export default NotFound