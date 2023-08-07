import Paragraph from "../ui/paragraph"
import Link from "next/link"
import ContentTabs from "./ContentTabs"
import Header from "./Header"
import TweetsContainer from "../TweetsContainer"
import { Suspense } from "react"
import Loading from "../ui/Loading"

const Content = () => {

  return (
    <div className="border-r border-darkGray flex-1">
      <div className="content">
        <Link href="/"><Paragraph className="font-bold text-lg p-3">Home</Paragraph></Link>
      </div>
      <ContentTabs/>
      <div className="p-3 border-b border-darkGray">
        <Header/>
      </div>
      <TweetsContainer/>
    </div>
  )
}

export default Content
