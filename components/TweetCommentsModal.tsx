"use client";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { Tweet, User as UserClient } from "@prisma/client"
import { User } from "next-auth"
import UserImage from "./ui/user-image";
import Paragraph from "./ui/paragraph";
import Link from "next/link";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Image as ImageIcon, LocateFixed, ScanFaceIcon } from "lucide-react"
import Image from "next/image";

interface TweetCommentsModalProps {
  open: boolean;
  handleClose: () => void;
  tweet: Tweet & {
    user: UserClient;
  };
  user: User | undefined;
}

const TweetCommentsModal: React.FC<TweetCommentsModalProps> = ({
  open,
  handleClose,
  tweet,
  user
}) => {
    const [postValue,setPostValue] = useState("");
    const [image,setImage] = useState("");

    const onUpload = (result: any) =>{
        console.log(result);
        
        setImage(result.info.secure_url);
    }
  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-[#242d34]/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={"bg-black p-2"}>
            <X onClick={handleClose} size={45} className="p-2 mb-3 hover:bg-[rgba(255,255,255,0.1)] duration-150 rounded-full cursor-pointer"/>
            <div className="flex gap-2">
                <div className="flex flex-col items-center gap-2 h-full">
                    <UserImage imgUrl={tweet.user.imageUrl}/>
                    <div className="min-h-[150px] h-[100%] w-[2px] bg-[#333639]"></div>
                    <UserImage imgUrl={String(user?.image)}/>
                </div>
                <div className="">
                    <div className="flex gap-1 items-center">
                        <Paragraph className="font-bold text-[1em]">{tweet.user.username}</Paragraph>
                        <Paragraph className="text-[#71767B]">@{tweet.user.username.trim()}</Paragraph>
                    </div>
                    <div className="mt-2">
                        <Paragraph className="text-[1em] font-normal font-sans">{tweet.tweetDescription}</Paragraph>
                        <Paragraph className="text-sm text-slate-300 font-normal font-sans max-w-[300px] truncate">{tweet.uploadUrl}</Paragraph>
                        <Link href="/"><Paragraph className="text-sm text-[#6a6f73] font-normal font-sans max-w-[300px] truncate">Replying to <span className="text-lightBlue">@{tweet.user.username}</span></Paragraph></Link>
                    </div>
                    <div className="">
                        <input value={postValue} onChange={(e)=>setPostValue(e.target.value)} className='mb-4 bg-transparent outline-none px-1 py-2 w-full text-[1.1em]' placeholder='What is happening?!'/>
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
                        {image.trim()!=="" && 
                        <div className="flex items-center justify-center mt-4">
                        <Image src={image} alt="image couldn't be loaded" width={200} height={200} className="mx-auto"/>
                        </div>

                        }
                    </div>
                </div>
            </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TweetCommentsModal;
