import getAllUsers from '@/lib/getAllUsers'
import prismadb from '@/lib/db'
import Paragraph from '@/components/ui/paragraph'
import { User } from '@prisma/client'
import UserProfile from '@/components/TweetUserPage/UserProfile'
import { ArrowLeft } from 'lucide-react'
import Tweet from '@/components/ui/tweet'
import Link from 'next/link'

type Params = {
  params:{
    profileName: string;
  }
}


const TweetUserPage:React.FC<Params> = async ({params:{profileName}}) => {
  const decodedProfileName = decodeURIComponent(profileName);
  const user = await prismadb.user.findFirst({
    where:{
      username: decodedProfileName,
    },
    include:{
      tweets:true,
      following:true,
      followers:true,
    }
  });
  if(!user){
    return <Paragraph className="text-center text-[1.2em] font-bold mt-6">Cannot find any user with username {decodedProfileName}</Paragraph>
  }

  const tweets = await prismadb.tweet.findMany({
    where:{
      userId:user.id,
    },
    include:{
      user:true,
      comments:true,
    }
  })

  
  return (
    <div className='border-r border-darkGray h-full'>
      <div className="flex items-center py-2 gap-4">
        <Link href="/">
          <ArrowLeft className="p-2 hover:bg-[#191919] rounded-full duration-150 cursor-pointer" size={45}/>
        </Link>
        <div className="flex flex-col items-start justify-center">
          <Paragraph className='text-[1.1em] font-bold'>{decodedProfileName}</Paragraph>
          <Paragraph className='text-slate-500 text-sm'>{user.tweets.length <=1 ? `${user.tweets.length} tweet`:`${user.tweets.length} tweets`}</Paragraph>
        </div>
      </div>
      <UserProfile user={user}/>
      <div className="">
        {tweets.length > 0 ? (
          tweets.map((tweet)=>(
          
            <Tweet tweet={tweet}/>
          ))
        ):(
          <Paragraph className='text-center my-3'>no current tweets</Paragraph>
        )}
      </div>
    </div>
  )
}

export default TweetUserPage

export async function generateStaticParams(){
  const allUsers = await getAllUsers();

  if(!allUsers || allUsers.length===0)
    return [];

  return allUsers.users.map((user: User)=>{
    const encodedUsername = encodeURIComponent(user.username);
    return {
      profileName: encodedUsername,
    }
  })
}