import getAllUsers from '@/lib/getAllUsers'
import Header from '@/components/TweetPage/Header'
import prismadb from '@/lib/db'
import Paragraph from '@/components/ui/paragraph'
import { User } from '@prisma/client'
import UserProfile from '@/components/TweetUserPage/UserProfile'

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
      <Header label={decodedProfileName}/>
      <Paragraph className='text-slate-500 text-sm px-5 -mt-2'>{user.tweets.length <=1 ? `${user.tweets.length} tweet`:`${user.tweets.length} tweets`}</Paragraph>
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