"use client"

import { Image as ImageIcon, LocateFixed, ScanFaceIcon } from "lucide-react"
import Button from "../ui/button"
import { useState } from "react"
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";


const TweetPlaceholder = () => {
    const [postValue,setPostValue] = useState("");
    const [image,setImage] = useState("");
    console.log("img",image);

    const onUpload = (result: any) =>{
      console.log(result);
      
      setImage(result.info.secure_url)
  }
  return (
    <div className="">
        <input value={postValue} onChange={(e)=>setPostValue(e.target.value)} className='mb-4 bg-transparent outline-none px-1 py-2 w-full' placeholder='What is happening?!'/>
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
            <Button className={`rounded-xl py-1 px-3 ${postValue.trim()==='' && image.trim()==='' ? "bg-darkBlue text-gray-400 pointer-events-none":""}`}>Tweet</Button>
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