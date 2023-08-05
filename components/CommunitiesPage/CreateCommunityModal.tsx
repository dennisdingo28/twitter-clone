"use client"
import { Dialog } from '@headlessui/react'
import { Loader2, X } from 'lucide-react';
import Paragraph from '../ui/paragraph';
import Input from '../ui/input';
import { CldUploadWidget } from 'next-cloudinary';
import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import Button from '../ui/button';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface CommunityModalProps {
    isOpen: boolean;
    communityImage: string;
    onUpload: Dispatch<SetStateAction<String>>;
    onClose: ()=> void;
}

const CreateCommunityModal: React.FC<CommunityModalProps> = ({communityImage,isOpen,onClose,onUpload}) => {
    const router = useRouter();

    const [communityName,setCommunityName] = useState<string>("");
    
    const {mutate: createCommunity,isLoading} = useMutation({
        mutationFn: async() =>{
            const res = await axios.post('/api/community',{
                communityName,
                communityImage,
            })
        },
        onSuccess:()=>{
            toast.success("Community created!");
            router.refresh();
        },
        onError:()=>{
            toast.error("Something went wrong. Please try again later!");
        }
    })

    return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-[#242d34]/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className={"bg-black rounded-md p-1"}>
                <div className="flex items-center ">
                    <X onClick={()=>onClose()} size={45} className='cursor-pointer p-2 rounded-full hover:bg-[rgba(255,255,255,.2)] duration-150'/>
                    <Paragraph className='flex-1 font-bold p-2 text-[1.1em] text-center'>Create your community</Paragraph>
                </div>
                <div className="p-2">
                    <Input defaultValue={communityName} onChange={(e)=>setCommunityName(e.currentTarget.value)}  className='w-full px-2' placeholder='give your community a name'/>
                    <CldUploadWidget onUpload={onUpload} uploadPreset="h7trytjb">
                        {
                            ({open})=>{
                                const onClick = () =>{
                                    open();
                                }
                                if(communityImage.trim()==='')
                                    return(
                                        <div onClick={onClick} className="mt-3 cursor-pointer hover:bg-[rgba(255,255,255,.08)] duration-200 flex items-center justify-center h-[120px] p-2 bg-[rgba(255,255,255,.1)]">
                                            <Paragraph className='text-gray-500 text-sm'>upload an image</Paragraph>
                                        </div>
                                    )
                                return (
                                    <div onClick={onClick} className="mt-3 cursor-pointer p-2">
                                        <Image src={communityImage} width={100} height={100} className='max-w-full max-h-[120px] mx-auto object-cover' quality={100} alt='community image'/>
                                    </div>
                                )
                            }
                        }
                    </CldUploadWidget>
                    <div className="flex items-center justify-center gap-2 mt-3">
                        <Button onClick={()=>createCommunity()} className={`p-2 rounded-md ${communityName.trim()==="" && "pointer-events-none bg-darkBlue"} ${isLoading && "pointer-events-none bg-darkBlue"}`}>Create</Button>
                        {isLoading && <Loader2 className='animate-spin' size={20}/>}
                    </div>
                </div>
            </Dialog.Panel>
        </div>
    </Dialog>
  )
}

export default CreateCommunityModal