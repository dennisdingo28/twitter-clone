import Hero from "@/components/CommunitiesPage/Hero";
import Community from "@/components/ui/community";
import Paragraph from "@/components/ui/paragraph"
import { getAuthSession } from "@/lib/authOptions";
import prismadb from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Communities = async () => {
  const session = await getAuthSession();
  const communities = await prismadb.community.findMany({
    include:{
      users:{
        include:{
          user:true,
        }
      },
    }
  });
  
  return (
    <div>
         <div className="mb-5">
          <div className="flex gap-4 p-3">
            <Link href="/">
                <ArrowLeft className="p-2 hover:bg-[#191919] rounded-full duration-150 cursor-pointer" size={45}/>
              </Link>
              <div className="">
                <Paragraph className='font-bold text-[1.1em]'>Communities</Paragraph>
                <Paragraph className='text-[.8em] text-[#71767b]'>@{session?.user?.name?.split(" ")[0]}{session?.user?.name?.split(" ")[1]}</Paragraph>
              </div>
          </div>
            <Hero userId={session?.user?.id!}/>
            <div className="flex flex-col mt-5">
              {communities.map((community)=>(
                <Link key={community.id} href={`/communities/${community.id}`}>
                  <Community key={community.id} community={community}/>
                </Link>
              ))}
            </div>
        </div>
    </div>
  )
}

export default Communities