import CommunityPosts from "@/components/CommunitiesPage/CommunityPosts";
import JoinCommunity from "@/components/CommunitiesPage/JoinCommunity";
import TweetPlaceholder from "@/components/HomePage/TweetPlaceholder";
import Paragraph from "@/components/ui/paragraph";
import { getAuthSession } from "@/lib/authOptions";
import prismadb from "@/lib/db";
import getAllCommunities from "@/lib/getAllCommunities"
import { Community } from "@prisma/client";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type Params = {
    params:{
      id: string;
    }
}

const CommunityPage:React.FC<Params> = async ({params:{id}}) => {
  const community = await prismadb.community.findUnique({
    where:{
      id:id,
    },
    include:{
      users:true,
    }
  });
  const session = await getAuthSession();

  let membersMessage = "";
    if(community?.users.length===0){
        membersMessage="members";
    }else if(community?.users.length===1){
        membersMessage="member";
    }else{
        membersMessage="members"
    }
  const communityImage: string | StaticImport = community?.imageUrl!;

  const user = await prismadb.user.findUnique({
    where:{
      id: session?.user?.id,
    }
  });
  
  const userAlreadyJoined = community?.users.some(communityUser=>communityUser.userId===user?.id) || false;  
  

  return (
    <div>
      <div className="p-3">
        <Paragraph className="font-bold text-[1.5em]">Welcome to Community</Paragraph>
      </div>
      <div className="p-3 flex flex-col items-center justify-center gap-2 xs:flex-row">
        <Image src={communityImage} width={160} height={160} className="max-w-[150px] max-h-[150px] object-cover" quality={100} alt="community image"/>
        <Paragraph className="font-bold text-[1.04em]">{community?.name}</Paragraph>
      </div>
      <div className="p-3 flex flex-col justify-center items-center gap-2 sm:gap-0 sm:flex-row xs:justify-between">
        <Paragraph className="text-sm font-bold text-white flex items-center gap-2">{community?.users.length}
        <span className="font-normal text-gray-500">{membersMessage}</span></Paragraph>
        <div className="">
          <JoinCommunity id={community?.id!} user={user!} users={community?.users || []} userId={session?.user?.id!}/>
        </div>
      </div>
      {userAlreadyJoined &&
        <TweetPlaceholder communityId={community?.id.toString()} user={user!}/>
      }
      <div>
        <CommunityPosts community={community!}/>
      </div>
    </div>
  )
}

export default CommunityPage


export async function generateStaticParams(){
    const allCommunities = await getAllCommunities();
    if(!allCommunities || !allCommunities.ok || allCommunities.communities.length===0)
        return [];
    
    return allCommunities.communities.map((community: Community)=>{
        return {
            id: community.id.toString(),
        }
    });
}