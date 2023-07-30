import { ArrowLeft } from "lucide-react"
import Paragraph from "../ui/paragraph"
import Link from "next/link"

const Header = () => {
  return (
    <div>
        <div className="flex items-center gap-3">
            <Link href={"/"}>
                <ArrowLeft className="p-2 hover:bg-[#191919] rounded-full duration-150 cursor-pointer" size={45}/>
            </Link>
            <Paragraph className="font-bold text-[1.1em]">Tweet</Paragraph>
        </div>
    </div>
  )
}

export default Header