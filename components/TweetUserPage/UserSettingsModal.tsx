"use client";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import Paragraph from "../ui/paragraph";
import Button from "../ui/button";
import { User } from "@prisma/client";
import { Upload } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import ProfileImage from "../ui/ProfileImage";
import Input from "../ui/input";
import {useForm} from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface UserSettingsModalProps {
    open: boolean;
    handleClose: ()=>void;
    user: User;
}

const UserSettingsModal: React.FC<UserSettingsModalProps> = ({open,handleClose,user}) => {

    const router = useRouter();

    const {register, handleSubmit} = useForm({
        defaultValues:{
            bio:user.bio,
            occupation:user.occupation,
            location:user.location,
            website:user.website,
        }
    })

    const [profileImage,setProfileImage] = useState<string>(user.imageUrl);
    const [headerProfileImage,setHeaderProfileImage] = useState<string>(user.headerProfileImage);

    const onUploadProfileImage = (result: any)=>{
        setProfileImage(result.info.secure_url);
    }
    const onUploadHeaderProfileImage = (result: any)=>{
        setHeaderProfileImage(result.info.secure_url);
    }

    const {mutate:updateUser, isLoading} = useMutation({
        mutationFn: async(data: any)=>{
            await axios.patch(`/api/user/${user.id}`,{...data,imageUrl:profileImage,headerProfileImage})
        },
        onSuccess:()=>{
            toast.success("Profile updated")
            setTimeout(()=>{
                router.refresh();
            },750)
        },
        onError:()=>{
            toast.error("Error")
            setTimeout(()=>{
                router.refresh();
            },750)
        }
    })

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-[#242d34]/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center sm:p-4">
        <Dialog.Panel className={"bg-black p-3 rounded-md w-full sm:max-w-fit sm:mx-auto"}>
        <form className="mt-5 flex flex-col gap-3" onSubmit={handleSubmit(data=>updateUser(data))}>

           <div className="">
                <div className="flex gap-3 items-center">
                    <X onClick={handleClose} size={60} className="cursor-pointer p-2 px-3 rounded-full hover:bg-[#181919]"/>
                    <div className="flex items-center justify-between w-full">
                        <Paragraph className="text-[1.1em] font-bold">Edit Profile</Paragraph>
                        <Button className={`py-2 px-5 rounded-full bg-white text-black font-semibold hover:bg-[#D7DBDC] duration-150 ${isLoading && "bg-[#D7DBDC] pointer-events-none"}`}>{!isLoading ? "Save":"Updating your profile..."}</Button>
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
                                        return <div className="flex flex-col items-center justify-center cursor-pointer" onClick={onClick}>
                                            <div className="w-[150px] h-[100px]">
                                                <Image width={150} height={100} quality={100} className="rounded-md" priority src={headerProfileImage} alt="header profile image"/>
                                            </div>
                                            <Paragraph className="text-sm font-semibold">Header Profile Image</Paragraph>
                                        </div>
                                    }else{
                                        return <div onClick={onClick} className="w-[150px] h-[100px] cursor-pointer bg-[#333639] flex flex-col items-center justify-center text-center">
                                            no image
                                            <Upload size={20} className=""/>
                                        </div>
                                    }
                                }}
                    </CldUploadWidget>

                </div>
                <div className="flex flex-col gap-3 mt-4">
                    <Input {...register("bio")} placeholder="Bio" className="w-full sm:w-[256px] md:w-[500px] h-[90px]"/>
                    <Input {...register("occupation")} placeholder="Occupation" className="w-full sm:w-[256px] md:w-[500px] h-[70px]"/>
                    <Input {...register("location")} placeholder="Location" className="w-full sm:w-[256px] md:w-[500px] h-[70px]"/>
                    <Input {...register("website")} placeholder="Website" className="w-full sm:w-[256px] md:w-[500px] h-[70px]"/>
                </div>
                
            </div>
           </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UserSettingsModal;
