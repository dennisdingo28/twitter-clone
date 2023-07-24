"use client"
import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react';
import Logo from './logo';
import LoginProviders from '../LoginProviders';

interface ModalProps {
    modalTitle: string;
    modalDescription?: string;
    children?: React.ReactNode;
    isOpen: boolean;
    setOpen: (open: boolean) =>void;
}

const Modal: React.FC<ModalProps> = ({modalTitle,modalDescription,children,isOpen,setOpen}) => {


  return (
    <Dialog
      open={isOpen}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-black py-2 px-20 font-roboto">
            <div className='flex items-center' onClick={()=>{
                setOpen(false);
                window.location.reload();
            }}>
                <X size={50} className='hover:bg-[#191919] duration-100 rounded-full p-2 cursor-pointer'/>
                <div className="flex-1 flex justify-center">
                    <Logo className='bg-lightGray'/>
                </div>
            </div>
          <div className={"mt-3"}>
            <Dialog.Title className='text-[1.3em] font-medium text-white text-center'>
              {modalTitle}
            </Dialog.Title>
          </div>  
          <div className="">
            <LoginProviders/>   
            <div className="flex items-center justify-center gap-3">
                <div className='h-[1px] flex-1 bg-gray-300'></div>
                <Dialog.Description className='text-slate-400 mt-1 mb-3 text-[.85em] text-center'>
                    {modalDescription}
                </Dialog.Description>
                <div className='h-[1px] flex-1 bg-gray-300'></div>
            </div>
            <div className="px-3 py-2">{children}</div>
            
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )

}

export default Modal