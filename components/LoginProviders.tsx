import Button from "./ui/button"
import {Chrome,GithubIcon} from "lucide-react"

const LoginProviders = () => {
  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-4">
        <Button variant={"authProvider"} className="flex items-center justify-center gap-2 w-full">Connect with Google<Chrome size={25}/></Button>
        <Button variant={"authProvider"} className="flex items-center justify-center gap-2 w-full"><GithubIcon size={25}/> Register with Github</Button>
    </div>
  )
}

export default LoginProviders