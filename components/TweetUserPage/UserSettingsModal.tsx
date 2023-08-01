"use client";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import UserImage from "../ui/user-image";
import Paragraph from "../ui/paragraph";
import Button from "../ui/button";
import { User } from "@prisma/client";
import { Upload } from "lucide-react";
import { CldUploadWidget,CldUploadWidgetPropsChildren } from "next-cloudinary";
import { useState } from "react";
import ProfileImage from "../ui/ProfileImage";

interface UserSettingsModalProps {
    open: boolean;
    handleClose: ()=>void;
    user: User;
}

const UserSettingsModal: React.FC<UserSettingsModalProps> = ({open,handleClose,user}) => {

    const [profileImage,setProfileImage] = useState<string>(user.imageUrl);
    const [headerProfileImage,setHeaderProfileImage] = useState<string>("");


    const onUploadProfileImage = (result: any)=>{
        setProfileImage(result.info.secure_url);
    }
    const onUploadHeaderProfileImage = (result: any)=>{
        setHeaderProfileImage(result.info.secure_url);
    }
  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-[#242d34]/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center sm:p-4">
        <Dialog.Panel className={"bg-black p-2 rounded-md w-full sm:max-w-fit sm:mx-auto"}>
           <div className="p-3">
            <div className="flex gap-3 items-center">
                <X size={50} className="cursor-pointer p-2 px-3 rounded-full hover:bg-[#181919]"/>
                <div className="flex items-center justify-between w-full">
                    <Paragraph className="text-[1.1em] font-bold">Edit Profile</Paragraph>
                    <Button className="py-2 px-5 rounded-full bg-white text-black font-semibold hover:bg-[#D7DBDC] duration-150">Save</Button>
                </div>
            </div>
            <div className="flex items-center gap-10 justify-between mt-8">
                    <div className="flex flex-col gap-2 items-center">
                        <CldUploadWidget onUpload={onUploadProfileImage}  uploadPreset="h7trytjb">
                            {({open})=>{
                                const onClick = () =>{
                                    open();
                                }
                                return (
                                    <div className="" onClick={onClick}>
                                        <ProfileImage imgUrl={profileImage} label="Profile Image"/>

                                    </div>
                                    )
                            }}
                            
                        </CldUploadWidget>

                    </div>
                <CldUploadWidget onUpload={onUploadHeaderProfileImage} uploadPreset="h7trytjb">
                        {({open})=>{
                                const onClick = () =>{
                                    open();
                                }
                                if(headerProfileImage.trim()!==""){
                                    return <div className="" onClick={onCLcik}>
                                        <ProfileImage imgUrl={headerProfileImage} label="Header Profile Image"/>
                                    </div>
                                }else{
                                    return <div onClick={onClick} className="w-[80px] h-[80px] cursor-pointer bg-[#333639] flex flex-col items-center justify-center">
                                        no image
                                        <Upload size={20} className=""/>

                                    </div>
                                }
                            }}
                </CldUploadWidget>

            </div>
           </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UserSettingsModal;
