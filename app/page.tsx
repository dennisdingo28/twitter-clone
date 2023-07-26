import Content from "@/components/HomePage/Content";
import InfoPanel from "@/components/HomePage/InfoPanel";
import PanelSide from "@/components/HomePage/PanelSide";
import Container from "@/components/ui/container";
import { getAuthSession } from "@/lib/authOptions"
export default async function Home() {
  const session = await getAuthSession();
  console.log("ses",session);
  
  return (
   <main className="h-screen">
    <Container>
      <div className="flex h-screen">
        <div className="flex justify-center">
          <PanelSide/>
        </div>
        <Content/>

        <div className="hidden lg:flex flex-1  justify-center ">
          <InfoPanel/>
        </div>
      </div>
    </Container>
   </main>
  ) 
}
