"use client"
import qs from "query-string"
import axios from "axios";

interface TweetPostProps{
    accountName: string;
    tweetId: string;
}

const TweetPost:React.FC<TweetPostProps> = async ({accountName,tweetId}) => {
    console.log(accountName);

    try{
        const queryUrl = qs.stringifyUrl({
            url:"/api/user",
            query:{
                username:accountName,
            }
        });
        console.log(queryUrl);
        const user = await axios.get(queryUrl);
        console.log("tp",user);
        
    }catch(err){

    }
        
    return (
    <div>TweetPost</div>
  )
}

export default TweetPost