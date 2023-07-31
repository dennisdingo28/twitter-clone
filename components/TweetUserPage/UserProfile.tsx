import Image from "next/image"

const UserProfile = () => {
  return (
    <div>
        <div className="">
            <Image fill quality={100} className="w-full max-w-fit object-cover h-[100%] max-h-[200px] min-h-[125px]" src="/twitterHeaderImage.jpg" alt="header image"/>
        </div>
        <div className=""></div>
    </div>
  )
}

export default UserProfile
