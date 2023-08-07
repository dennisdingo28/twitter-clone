import Content from "@/components/HomePage/Content";

import { getAuthSession } from "@/lib/authOptions"


export default async function Home() {
  const session = await getAuthSession();
  
  return (
   <main className="h-screen">
      <div className="flex-1">
          <Content/>
      </div>
   </main>
  ) 
}
