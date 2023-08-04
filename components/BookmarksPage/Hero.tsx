import Image from "next/image"
import Paragraph from "../ui/paragraph"

const Hero = () => {
  return (
    <div className="px-3">
        <Image width={400} height={400} className="mx-auto" src={"/bookmark.png"} alt="bookmarkImage"/>
        <Paragraph className="text-center font-extrabold text-[1.6em] ">
            Save Tweets for later
        </Paragraph>
        <Paragraph className="text-[#71767b] text-center">
            Don’t let the good ones fly away! Bookmark Tweets to easily find them again in the future.
        </Paragraph>
    </div>
  )
}

export default Hero