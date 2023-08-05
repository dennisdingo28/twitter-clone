import { Tweet, User, Comment,Bookmark } from "@prisma/client";
import Tweets from "./Tweets";
import prismadb from "@/lib/db";



const TweetsContainer: React.FC = async () => {
  const tweets:(Tweet & {
    user: User & {
      bookmarks: Bookmark[]
     } | null;
    comments: Comment[];
  })[] = await prismadb.tweet.findMany({
    include: {
      user: {
        include:{
          bookmarks:true,
        }
      },
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <Tweets tweets={tweets} />
    </div>
  );
};

export default TweetsContainer;
