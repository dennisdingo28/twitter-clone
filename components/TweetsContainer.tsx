import { Tweet, User, Comment } from "@prisma/client";
import Tweets from "./Tweets";
import prismadb from "@/lib/db";



const TweetsContainer: React.FC = async () => {
  const tweets:(Tweet & {
    user: User | null;
    comments: Comment[];
  })[] = await prismadb.tweet.findMany({
    include: {
      user: true,
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
