import { getAuthSession } from "@/lib/authOptions"
import UserImage from "./ui/user-image"
import LabelInfo from "./ui/label-info";
import Paragraph from "./ui/paragraph";

const UserControl:React.FC = async () => {
    const session = await getAuthSession();
  return (
    <div className="cursor-pointer">
        <div className="group hover:bg-[rgba(255,255,255,.1)] rounded-full p-3 duration-200 relative xl:flex xl:gap-3">
            <UserImage imgUrl={session?.user?.image || ""}/>
            <LabelInfo className="-z-10 mt-1 absolute group-hover:opacity-100 opacity-0 group-hover:z-10 left-[50%] -translate-x-[50%] px-1 rounded-sm text-sm bg-slate-600 duration-200 xl:hidden" label={"Accounts"}/>
            <div className="">
                <Paragraph className="font-bold">{session?.user?.name}</Paragraph>
                <Paragraph className="text-[#6b7075] truncate max-w-[150px]">@{session?.user?.name}</Paragraph>
            </div>
           
        </div>
    </div>
  )
}

export default UserControl