import getAllUsers from '@/lib/getAllUsers'
import prismadb from '@/lib/db'
import Paragraph from '@/components/ui/paragraph'
import { User } from '@prisma/client'
import UserProfile from '@/components/TweetUserPage/UserProfile'
import { ArrowLeft } from 'lucide-react'

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
      tweets:true
    }
  });
  if(!user){
    return <Paragraph className="text-center text-[1.2em] font-bold mt-6">Cannot find any user with username {decodedProfileName}</Paragraph>
  }


  return (
    <div className='border-r border-darkGray h-full'>
      <div className="flex items-center py-2 gap-4">
        <ArrowLeft className="p-2 hover:bg-[#191919] rounded-full duration-150 cursor-pointer" size={45}/>
        <div className="flex flex-col items-start justify-center">
          <Paragraph className='text-[1.1em] font-bold'>{decodedProfileName}</Paragraph>
          <Paragraph className='text-slate-500 text-sm'>{user.tweets.length <=1 ? `${user.tweets.length} tweet`:`${user.tweets.length} tweets`}</Paragraph>
        </div>
      </div>
      <UserProfile/>
    </div>
  )
}

export default TweetUserPage

export async function generateStaticParams(){
  const allUsers = await getAllUsers();

  return allUsers.users.map((user: User)=>{
    const encodedUsername = encodeURIComponent(user.username);
    return {
      profileName: encodedUsername,
    }
  })
}