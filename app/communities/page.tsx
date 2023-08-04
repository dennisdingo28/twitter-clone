import Hero from "@/components/CommunitiesPage/Hero";
import Paragraph from "@/components/ui/paragraph"
import { getAuthSession } from "@/lib/authOptions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Communities = async () => {
  const session = await getAuthSession();

  return (
    <div>
         <div className="mb-5 p-3 ">
          <div className="flex gap-4">
            <Link href="/">
                <ArrowLeft className="p-2 hover:bg-[#191919] rounded-full duration-150 cursor-pointer" size={45}/>
              </Link>
              <div className="">
                <Paragraph className='font-bold text-[1.1em]'>Communities</Paragraph>
                <Paragraph className='text-[.8em] text-[#71767b]'>@{session?.user?.name?.split(" ")[0]}{session?.user?.name?.split(" ")[1]}</Paragraph>
              </div>
          </div>
            <Hero/>
        </div>
    </div>
  )
}

export default Communities