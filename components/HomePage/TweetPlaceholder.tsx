"use client"

import { Image as ImageIcon, LocateFixed, ScanFaceIcon } from "lucide-react"
import Button from "../ui/button"
import { useState } from "react"
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { TweetRequest } from "@/validators";
import axios from "axios";
import { User } from "next-auth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface TweetPlaceholderProps {
  user: User | undefined;
}

const TweetPlaceholder: React.FC<TweetPlaceholderProps> = ({user}) => {
    const router = useRouter();

    const [postValue,setPostValue] = useState("");
    const [image,setImage] = useState("");

    const onUpload = (result: any) =>{
      console.log(result);
      
      setImage(result.info.secure_url)
    }



  const {mutate: createTweet, isLoading} = useMutation({
    mutationFn: async (data: TweetRequest) => {
      const newTweet = await axios.post('/api/tweet',data);
      return newTweet.data;
    },
    onSuccess:(data)=>{
      toast.success("Tweet was successfully created!");  
      setTimeout(()=>{
        setPostValue("");
        setImage("");
      },1700);
      router.refresh();
    },
    onError:(err: any)=>{
      if(err.response.data)
        toast.error(err.response.data);
      else
        toast.error("Something went wrong while trying to create the tweet");
    }
  })


  return (
    <div className="">
        <input value={postValue} onChange={(e)=>setPostValue(e.target.value)} className='mb-4 bg-transparent outline-none px-1 py-2 w-full text-[1.1em]' placeholder='What is happening?!'/>
        <div className="flex justify-between">
            <div className="flex">
              <CldUploadWidget onUpload={onUpload} uploadPreset="h7trytjb">
                  {({open})=>{
                      const onClick = () =>{
                          open();
                      }
                      return (
                        <ImageIcon size={40} onClick={onClick} className="text-lightBlue text-sm hover:bg-[#031019] cursor-pointer rounded-full p-2"/>
                      )
                  }}
              </CldUploadWidget>
                  <ScanFaceIcon size={40} className="text-darkBlue text-sm hover:bg-[#031019] cursor-pointer rounded-full p-2"/>
                  <LocateFixed size={40} className="text-darkBlue text-sm hover:bg-[#031019] cursor-pointer rounded-full p-2"/>
            </div>
            <Button onClick={()=>createTweet({tweetDescription: postValue, uploadUrl: image, userId:user?.id!})} className={`rounded-xl py-1 px-3 ${(postValue.trim()==='' && image.trim()==='') || isLoading ? "bg-darkBlue text-gray-400 pointer-events-none":""}`}>{!isLoading ? "Tweet":"Tweeting..."}</Button>
        </div>
        {image.trim()!=="" && 
        <div className="flex items-center justify-center mt-4">
          <Image src={image} alt="image couldn't be loaded" width={200} height={200} className="mx-auto"/>
        </div>

        }
    </div>
  )
}

export default TweetPlaceholder