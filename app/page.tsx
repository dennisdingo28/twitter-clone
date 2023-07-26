import SignOut from "@/components/SignOut";
import { getAuthSession } from "@/lib/authOptions"
export default async function Home() {
  const session = await getAuthSession();
  console.log("ses",session);
  
  return (
   <main>
    <div className="container mx-auto bg-red-500">
      <img src="/twitter-logo.png"/>
      <SignOut/>
    </div>
   </main>
  )
}
