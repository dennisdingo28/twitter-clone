import axios from "axios";

export default async function likeTweet(tweetId: string, newLikes: Array<string>){
    
    const res = await axios.patch(`/api/tweet/${tweetId}`,{
        likes:newLikes
    });

}