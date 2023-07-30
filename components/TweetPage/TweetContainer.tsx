"use client"
import { useParams } from "next/navigation"
import TweetPost from "./TweetPost";

const TweetContainer = () => {
    const {profileName, tweetId} = useParams();
    const newProfileName = decodeURIComponent(String(profileName));
  return (
    <TweetPost accountName={newProfileName} tweetId={String(tweetId)}/>
  )
}

export default TweetContainer