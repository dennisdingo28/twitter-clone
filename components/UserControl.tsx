import { getAuthSession } from "@/lib/authOptions"

import UserControlContent from "./UserControlContent";


const UserControl:React.FC = async () => {
    const session = await getAuthSession();
    
  return (
    <UserControlContent user={session?.user!}/>
  )
}

export default UserControl