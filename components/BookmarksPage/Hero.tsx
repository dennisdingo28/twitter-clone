import Image from "next/image"
import Paragraph from "../ui/paragraph"
import Tweets, { TweetProps } from "../Tweets"
import { getAuthSession } from "@/lib/authOptions"
import prismadb from "@/lib/db"

const Hero = async () => {
  const session = await getAuthSession();
  const targetUser = await prismadb.user.findUnique({
    where:{
      id:session?.user?.id,
    },
    include:{
      bookmarks:{
        include:{
          tweet:{
            include:{
              user:{
                include:{
                  bookmarks:true,
                }
              },
              comments:true,
            }
          }
        }
      }
    }
  });
  const bookmarkedTweets: Array<any> = [];

  for(let i=0;i<targetUser?.bookmarks.length!;i++){
    bookmarkedTweets.push(targetUser?.bookmarks[i].tweet);
  }
 
  
  if(!targetUser){
    return <Paragraph className="text-center font-extrabold text-[1.6em] ">
              Something went wrong. Please try again later.
          </Paragraph>
  }
  return (
    <div className="">
      {bookmarkedTweets.length===0 ? (
        <div className="px-3">
        <Image width={400} height={400} className="mx-auto" src={"/bookmark.png"} alt="bookmarkImage"/>
        <Paragraph className="text-center font-extrabold text-[1.6em] ">
            Save Tweets for later
        </Paragraph>
        <Paragraph className="text-[#71767b] text-center">
            Don’t let the good ones fly away! Bookmark Tweets to easily find them again in the future.
        </Paragraph>
      </div>
      ):(
        <div className="mt-5">
          <Tweets tweets={bookmarkedTweets}/>
        </div>
      )}
    </div>
  )
}

export default Hero