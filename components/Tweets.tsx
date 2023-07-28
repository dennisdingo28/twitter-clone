import { Tweet as TweetType } from "@prisma/client"
import Tweet from "./ui/tweet";

interface TweetProps {
    tweets: Array<TweetType>;
}
const Tweets:React.FC<TweetProps> = ({tweets}) => {

  return (
    <div className="">
        {tweets.map((tweet)=>(
            <Tweet key={tweet.id} tweet={tweet}/>
        ))}
    </div>
  )
}

export default Tweets
