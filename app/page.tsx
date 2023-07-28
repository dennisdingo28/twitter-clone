import Content from "@/components/HomePage/Content";
import InfoPanel from "@/components/HomePage/InfoPanel";
import PanelSide from "@/components/HomePage/PanelSide";
import Container from "@/components/ui/container";
import { getAuthSession } from "@/lib/authOptions"
export default async function Home() {
  const session = await getAuthSession();
  
  return (
   <main className="h-screen">
    <Container>
      <div className="flex h-screen">

        <div className="min-w-[100px] ml-0 xs:ml-[5%] md:ml-[10%] max-w-[100%]">
          <PanelSide/>
        </div>

        <div className="flex-1 flex h-screen overflow-y-scroll">
          <div className="flex-1">
              <Content/>
          </div>
          <div className="hidden lg:flex flex-1 justify-center ">
              <InfoPanel/>
          </div>
        </div>
    
        
      </div>
    </Container>
   </main>
  ) 
}
