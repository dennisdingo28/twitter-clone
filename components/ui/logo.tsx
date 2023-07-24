import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

interface LogoProps extends HTMLAttributes<HTMLImageElement>{}

const Logo: React.FC<LogoProps> = ({className}) => {
  return (
    <div className={cn("w-[55px] h-[55px] cursor-pointer text-lightGray hover:bg-lightGray rounded-full p-2 duration-75",className)}>
        <svg viewBox="0 0 24 24" aria-label="Twitter" role="img" className="r-13v1u17 r-4qtqp9 r-yyyyoo r-16y2uox r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M14.258 10.152L23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293l-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246zm0 0"></path></g></svg>
    </div>
  )
}

export default Logo