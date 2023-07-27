
import Link from "next/link";
import Paragraph from "./paragraph"
import SignOut from "../SignOut";

interface PopoverProps {
    label: string;
}

const Popover: React.FC<PopoverProps> = ({label}) => {
  return(
    <div className="shadow-[0px_0px_10px_rgba(255,255,255,0.3)] rounded-lg py-3">
        <div className="popoverHeader border-b-2 border-darkGray"></div>
        <div className="hover:bg-[rgba(255,255,255,0.1)]">
            <div className="p-3">
                <Link href={"/login"} >
                    <Paragraph className="font-bold text-sm whitespace-nowrap">Add an existing account</Paragraph>
                </Link>
            </div>
        </div>
        <div className="hover:bg-[rgba(255,255,255,0.1)]">
            <div className="p-3 w-full">
                <SignOut className="bg-transparent border-none hover:bg-transparent text-start w-full"><Paragraph className="font-bold text-sm">Log out <br/> @{label}</Paragraph></SignOut>
            </div>
        </div>
    </div>
  )
}

export default Popover