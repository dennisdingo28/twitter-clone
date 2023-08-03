import RecommendedUsers from "../RecommendedUsers"
import SearchUserInput from "../SearchUserInput"
import Paragraph from "../ui/paragraph"

const InfoPanel = () => {
  return (
    <div className="w-full flex flex-col items-start justify-start text-white p-3">
      <SearchUserInput/>
      <div className="">
        <Paragraph className="my-3 text-start text-[1em] text-gray-300">Recommended Users</Paragraph>
        <RecommendedUsers/>
      </div>
    </div>
  )
}

export default InfoPanel