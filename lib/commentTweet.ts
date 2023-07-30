import axios from "axios";
export default async function(tweetId: string,prevComments: any,commentValue: string,userId: string,image?: string){
    const newComment = await axios.post('/api/tweet/comments',{
        tweetId,
        userId,
        comment:commentValue,
        uploadUrl: image,
    });
    
    const res = await axios.patch(`/api/tweet/${tweetId}`,{
        comments:[
            newComment.data.newComment,
            ...prevComments
        ],
    });
};