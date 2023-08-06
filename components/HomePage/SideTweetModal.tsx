"use client"
import { Dialog } from '@headlessui/react'
import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import TweetPlaceholder from './TweetPlaceholder';
import { User } from 'next-auth';
import { X } from 'lucide-react';


interface SideTweetModalProps {
    isOpen: boolean;
    onClose: ()=> void;
    user: User | undefined;
}

const SideTweetModal: React.FC<SideTweetModalProps> = ({isOpen,onClose,user}) => {
    const router = useRouter();

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-[#242d34]/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className={"bg-black rounded-md p-1"}>
                <X size={40} onClick={onClose} className='rounded-full p-2 cursor-pointer hover:bg-[rgba(255,255,255,.1)] duration-150'/>
                <TweetPlaceholder user={user}/>
            </Dialog.Panel>
        </div>
    </Dialog>
  )
}

export default SideTweetModal