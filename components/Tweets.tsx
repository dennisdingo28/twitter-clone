import { Comment, Tweet as TweetType, User } from "@prisma/client";
import Tweet from "./ui/tweet";

interface TweetProps {
  tweets: (TweetType & {
    user: User | null;
    comments: Comment[];
  })[]
}

const Tweets: React.FC<TweetProps> = ({ tweets }) => {
  return (
    <div className="">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default Tweets;
