import { infoSideFooter } from "@/constants"
import RecommendedUsers from "../RecommendedUsers"
import SearchUserInput from "../SearchUserInput"
import Paragraph from "../ui/paragraph"

const InfoPanel = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col items-start justify-start text-white p-3">
      <SearchUserInput/>
      <div className="h-full">
        <div className="flex flex-col h-full justify-between">
          <RecommendedUsers/>
          <div className="grid grid-cols-3 gap-3 max-w-[300px] p-3">
            {infoSideFooter.map((value)=>(
              <Paragraph key={value.id} className="text-[#71767b] cursor-pointer hover:underline">{value.label}</Paragraph>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoPanel