"use client"

import { HTMLAttributes } from "react";
import Paragraph from "./paragraph";

interface IconInteractionProps extends HTMLAttributes<HTMLDivElement>{
    icon: React.ReactNode;
    textData?: string;
   handleClick: () => void;
}

const IconInteraction: React.FC<IconInteractionProps> = ({icon,textData,handleClick,className}) => {
  return <div onClick={handleClick} className="cursor-pointer group duration-150 flex gap-1 items-center">
        {icon}
        <Paragraph className={className}>{textData}</Paragraph>
  </div>
}

export default IconInteraction