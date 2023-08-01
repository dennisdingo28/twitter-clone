"use client"

import { HTMLAttributes } from "react";
import Paragraph from "./paragraph";
import { useOrigin } from "@/hooks/useOrigin";

interface CopyBtnProps extends HTMLAttributes<HTMLDivElement>{
    icon : React.ReactNode;
    label?: string;
    textToCopy: string;
}
const CopyBtn:React.FC<CopyBtnProps> = ({icon,label,textToCopy,className}) => {
    const origin = useOrigin();
  return (
    <div className={className} onClick={async ()=>{
        await navigator.clipboard.writeText(`${origin}${textToCopy}`);

    }}>
      {icon}
      <Paragraph>{label}</Paragraph>
    </div>
  )
}

export default CopyBtn
