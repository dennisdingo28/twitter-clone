import axios from "axios";

export default async function likeTweet(tweetId: string, newLikes: Array<string>){
    console.log('got here');
    
    const res = await axios.patch(`/api/tweet/${tweetId}`,{
        likes:newLikes
    });

}