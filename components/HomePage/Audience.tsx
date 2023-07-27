"use client";
import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { audiences } from '@/constants';
import { ArrowDown } from 'lucide-react';
import Paragraph from '../ui/paragraph';


export const Audience: React.FC = () =>{
    const [selectedAudience, setSelectedAudience] = useState(audiences[0])
    const [isOpen,setIsOpen] = useState<boolean>(false);
    return (
        
            <Listbox value={selectedAudience} onChange={(value)=>{
                setSelectedAudience(value);
                setIsOpen(!isOpen);
                }}>
                <div className="relative">
                    <div className="py-1 px-2 max-w-fit rounded-full border border-[#536471] hover:bg-[#031019]">
                        <Listbox.Button className={"text-sm text-lightBlue font-medium flex items-center gap-1"}>{selectedAudience.label} <ArrowDown size={20} className='text-lightBlue'/></Listbox.Button>
                    </div>

                    <div className={`bg-black left-[50%] -translate-x-[80%] z-10 p-2 mt-2 absolute shadow-[0px_0px_5px_rgba(255,255,255,0.5)] rounded-lg ${!isOpen ? "hidden":"block"}`}>
                        <Paragraph className='text-white text-[1.1em] text-start font-bold whitespace-nowrap'>Choose audience</Paragraph>
                        <Listbox.Options className={""}>
                            {audiences.map((audience) => (
                                <Listbox.Option
                                key={audience.id}
                                value={audience}
                                className={`text-sm text-lightBlue cursor-pointer ${selectedAudience===audience ? "font-bold":"font-normal"}`}
                                >
                                {audience.label}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                </div>
            </Listbox>        
    )
}