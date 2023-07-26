import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

interface LogoProps extends HTMLAttributes<HTMLImageElement>{}

const Logo: React.FC<LogoProps> = ({className}) => {
  return (
    <div className={cn("cursor-pointer rounded-full p-2 duration-75",className)}>
        <img src="/twitter-logo.png" className="w-[100px] h-[70px]"/>
    </div>
  )
}

export default Logo