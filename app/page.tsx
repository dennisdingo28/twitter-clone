import Content from "@/components/HomePage/Content";
import PanelSide from "@/components/HomePage/PanelSide";
import SignOut from "@/components/SignOut";
import { getAuthSession } from "@/lib/authOptions"
export default async function Home() {
  const session = await getAuthSession();
  console.log("ses",session);
  
  return (
   <main>
    <div className="">
      <PanelSide/>
    </div>
    <Content/>
    
   </main>
  ) 
}
