import { Search } from "lucide-react"

const InfoPanel = () => {
  return (
    <div className="w-full flex items-start justify-start text-white p-3">
        <div className="flex flex-row-reverse gap-5 items-center focus-within:bg-black focus-within:border-lightBlue border border-[#202327] bg-[#202327] px-3 py-2 rounded-full">
          <input className="bg-transparent outline-none searchInput peer placeholder:text-[#6c7175] text-[.9em] w-full" placeholder="Search Twitter"/>
          <Search size={27} className="text-[#71767b] peer-focus:text-lightBlue"/>
      </div>
      <div className=""></div>
    </div>
  )
}

export default InfoPanel