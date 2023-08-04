"use client"
import Link from "next/link";
import { usePathname } from "next/navigation"

const ContentTabs = () => {
    const path = usePathname();
    
    return (
        <div className="flex items-center justify-evenly border-b border-darkGray">
            <Link href={"/"} className="hover:bg-[rgba(24,24,24,.9)] cursor-pointer p-3 duration-150 flex justify-center w-full">
                <div ><p className={`${path==='/' ? "font-bold border-b-[3px] border-lightBlue text-white":"font-normal text-[#71767b]"}`}>For You</p></div>
            </Link>
            <Link href={"/following"} className="hover:bg-[rgba(24,24,24,.9)] cursor-pointer p-3 duration-150 flex justify-center w-full">
                <div><p className={`${path==='/following' ? "font-bold border-b-[3px] border-lightBlue text-white":"font-normal text-[#71767b]"}`}>Following</p></div>
            </Link>
        </div>
      )
}

export default ContentTabs