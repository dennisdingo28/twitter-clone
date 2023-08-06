import prismadb from "@/lib/db"
import { Community,UserCommunity } from "@prisma/client"
import Tweet from "../ui/tweet";
import Paragraph from "../ui/paragraph";

interface CommunityPostsProps{
    community: Community
}
const CommunityPosts: React.FC<CommunityPostsProps> = async ({community}) => {
    const posts = await prismadb.tweet.findMany({
        where:{
            communityId:community.id,
        },
        include:{
            user:{
                include:{
                    bookmarks:true,
                }
            },
            comments:true,
        },
        orderBy:{
            createdAt:'desc',
        },
    });
    return (
    <div>
        {posts.length>0 ? (
            posts.map(post=>(
                <Tweet tweet={post}/>
            ))
        ):(
            <Paragraph className="my-4 text-center font-medium text-gray-600">no current community posts</Paragraph>
        )}
    </div>
  )
}

export default CommunityPosts