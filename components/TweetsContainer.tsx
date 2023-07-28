import Tweets from "./Tweets";
import prismadb from "@/lib/db";


const TweetsContainer: React.FC = async () => {
  const tweets = await prismadb.tweet.findMany({
    include:{
      user:true
    },
    orderBy:{
      createdAt:"desc"
    }
  });
   
  return (
    <div>
      <Tweets tweets={tweets}/>
    </div>
  )
}

export default TweetsContainer;
