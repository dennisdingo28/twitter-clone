import Paragraph from "../ui/paragraph"
import Link from "next/link"
import ContentTabs from "./ContentTabs"
import Header from "./Header"

const Content = () => {
  return (
    <div className="border-r border-darkGray ">
      <div className="content">
        <Link href="/"><Paragraph className="font-bold text-lg p-3">Home</Paragraph></Link>
      </div>
      <ContentTabs/>
      <div className="p-3">
        <Header/>
      </div>
    </div>
  )
}

export default Content
