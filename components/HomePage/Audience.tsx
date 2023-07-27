"use client";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { audiences } from "@/constants";
import { ArrowDown } from "lucide-react";
import Paragraph from "../ui/paragraph";

export const Audience: React.FC = () => {
  const [selectedAudience, setSelectedAudience] = useState(audiences[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="relative cursor-pointer" onClick={()=>setIsOpen(!isOpen)}>
      <div className="py-1 px-2 max-w-fit rounded-full border border-[#536471] hover:bg-[#031019]">
        <div
          className={
            "text-sm text-lightBlue font-medium flex items-center gap-1"
          }
        >
          {selectedAudience.label}{" "}
          <ArrowDown size={20} className="text-lightBlue" />
        </div>
      </div>

      <div
        className={`bg-black left-[50%] -translate-x-[80%] duration-200 p-2 mt-2 absolute shadow-[0px_0px_5px_rgba(255,255,255,0.5)] rounded-lg ${
          !isOpen ? "opacity-0 -z-10" : "opacity-100 z-10"
        }`}
      >
        <Paragraph className="text-white text-[1.1em] text-start font-bold whitespace-nowrap">
          Choose audience
        </Paragraph>
        <div className={""}>
          {audiences.map((audience) => (
            <div onClick={()=>setSelectedAudience(audience)}
              key={audience.id}
              className={`text-sm text-lightBlue cursor-pointer ${
                selectedAudience === audience ? "font-bold" : "font-normal"
              }`}
            >
              {audience.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
