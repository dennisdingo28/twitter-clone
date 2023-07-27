"use client"
import { FC } from 'react'
import LabelInfo from './label-info';
import { usePathname } from 'next/navigation';

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    link: string;
}

const NavItem: FC<NavItemProps> = ({icon,label,link}) => {
  const path=usePathname();
  console.log(path===link);
  
  return <div>
    <div className="relative group xl:flex items-center justify-center gap-3">
        {icon}
        <LabelInfo className={`-z-10 mt-3 absolute group-hover:opacity-100 opacity-0 group-hover:z-10 left-[50%] -translate-x-[50%] px-1 rounded-sm text-sm bg-slate-600 duration-200 xl:hidden`} label={label}/>
        <p className={`hidden xl:block text-[1.1em] ${path===link && "font-bold"}`}>{label}</p>
    </div>
  </div>
}

export default NavItem