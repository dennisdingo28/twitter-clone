import prismadb from "@/lib/db";
import UserProfile from "./ui/userProfile";
import { getAuthSession } from "@/lib/authOptions";
import { User } from "@prisma/client";
import Button from "./ui/button";
import FollowUser from "./TweetUserPage/FollowUser";
import { FollowUserProps } from "./TweetUserPage/FollowUser";

const RecommendedUsers = async () => {
    const session = await getAuthSession();

    const allTweets = await prismadb.tweet.findMany();
    const randomStartingIndex = Math.floor(Math.random() * allTweets.length);
    let data = [];

    const recommendedUsers = await prismadb.user.findMany({
        skip: randomStartingIndex,
        take: 5,
        where: {
            NOT: {
                username: session?.user?.name || undefined, // Replace 'null' with the actual default value
            },
        },
        include:{
            tweets:true,
            following:true,
            followers:true,
        }
    });

    if(recommendedUsers.length===0){
        const defaultRecommendedUsers = await prismadb.user.findMany({
            take:5,
            where: {
                NOT: {
                    username: session?.user?.name || undefined, // Replace 'null' with the actual default value
                },
            },
            include:{
                tweets:true,
                following:true,
                followers:true,
            }
        });       
        data=defaultRecommendedUsers;
    }else{
        data=recommendedUsers;
    }



    return <div>
        
        {data.map((user)=>{

            return (
                <div className="flex items-center gap-5">
                    <UserProfile id={user.id} username={user.username} twitterUsername={user.username.split(" ")[0]+user.username.split(" ")[1]} userImage={user.imageUrl}/>
                    <FollowUser sessionUser={session?.user} user={user}/> //@ts-ignore
                </div>
            )
        })}
    </div>;
};

export default RecommendedUsers;
