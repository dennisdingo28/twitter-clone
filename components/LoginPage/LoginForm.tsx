import {useForm} from "react-hook-form";
import Input from "../ui/input";

const LoginForm = () => {
  const {register, handleSubmit, formState:{errors}} = useForm();

    return (
    <form>
        <div className="flex flex-col gap-3">
            <div className="relative">
                <Input id="username" className="peer w-full"/>
                <label className="absolute left-1 top-[50%] peer-focus:text-[.9em] text-[.95em] peer-focus:top-[13px] peer-focus:text-lightBlue -translate-y-[50%]" htmlFor="username">Username</label>
            </div>
            <div className="relative">
                <Input id="password" className="peer w-full"/>
                <label className="absolute left-1 top-[50%] peer-focus:text-[.9em] text-[.95em] peer-focus:top-[13px] peer-focus:text-lightBlue -translate-y-[50%]" htmlFor="username">Password</label>
            </div>
        </div>
    </form>
  )
}

export default LoginForm