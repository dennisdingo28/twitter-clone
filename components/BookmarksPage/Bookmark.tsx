"use client"
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BookMarked, BookMinus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface BookmarkProps {
  bookmarkId: string;
  isBookmarked: boolean;
  userId: string | undefined;
  tweetId: string;
}

const Bookmark: React.FC<BookmarkProps> = ({isBookmarked,userId,tweetId,bookmarkId}) => {

    const router = useRouter();
    const [bookmarked,setBookmarked] = useState(isBookmarked);

    const {mutate: handleBookmark,isLoading} = useMutation({
        mutationFn: async()=>{
            if(!isBookmarked){
                setBookmarked(true);
                const res = await axios.post(`/api/tweet/bookmark`,{
                    userId:userId,
                    tweetId:tweetId,
                });
            }
            else{
                setBookmarked(false);
                const res = await axios.delete(`/api/tweet/bookmark/${bookmarkId}`);
            }
        },
        onSuccess:()=>{
            router.refresh();
        },
        onError:()=>{
            toast.error("Something went wrong. Please try again later.");
            setBookmarked(false);
        }
    })

  return (
    <div className="">
      {!bookmarked ? (
        <BookMarked onClick={()=>handleBookmark()}
          size={40}
          className={`text-gray-500 cursor-pointer p-2 rounded-full hover:bg-[rgba(255,255,255,.1)] duration-200 ${isLoading && "pointer-events-none"}`}
        />
      ) : (
        <BookMinus onClick={()=>handleBookmark()}
          size={40}
          className={`text-gray-500 cursor-pointer p-2 rounded-full hover:bg-[rgba(255,255,255,.1)] duration-200 ${isLoading && "pointer-events-none"}`}
        />
      )}
    </div>
  );
};

export default Bookmark;
