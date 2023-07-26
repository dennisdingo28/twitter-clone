import { FC } from 'react'
import Input from './input';
import Paragraph from './paragraph';
import { UseFormRegister } from 'react-hook-form';

interface FormInputProps {
    name:string;
    placeholder?:string;
    show?: boolean;
    errMessage: string;
    register: UseFormRegister<any>;
    registerName?: string;
}

const FormInput: FC<FormInputProps> = ({name,placeholder,show,errMessage,register,registerName}) => {
  return(
    <div className="">
        <div className="flex flex-col-reverse">
            <Input id="username" className="peer w-full" placeholder={placeholder || ""} autoFocus={true} {...register(registerName || name)}/>
            <label className="text-[.95em] peer-focus:top-[-50%] text-darkBlue peer-focus:text-lightBlue" htmlFor="username">{name.charAt(0).toUpperCase()+name.slice(1)}</label>
        </div>
        {show && errMessage && <Paragraph variant={"destructive"} >{errMessage}</Paragraph>}
    </div>
  )
}

export default FormInput