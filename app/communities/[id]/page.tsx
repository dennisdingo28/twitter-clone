import getAllCommunities from "@/lib/getAllCommunities"
import { Community } from "@prisma/client";

type Params = {
    params:{
      id: string;
    }
}

const CommunityPage:React.FC<Params> = async ({params:{id}}) => {
    
    
  return (
    <div>CommunityPage</div>
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