import React, { HTMLAttributes, ForwardedRef } from 'react';
import { cva, VariantProps } from "class-variance-authority";
import { cn } from '@/lib/utils/cn';

const inputVariants = cva("border-lightBlue outline-none", {
    variants: {
        variant: {
            "default": "bg-transparent border border-[#333639] text-gray-100 font-normal focus:border-lightBlue py-3 px-1 rounded-sm duration-100",
            "outline":"border-b p-1 border-[#333639] text-gray-100 font-normal focus:border-lightBlue duration-100",
        }
    },
    defaultVariants: {
        variant: "default",
    }
});

interface InputProps extends HTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {};

const Input: React.ForwardRefExoticComponent<React.PropsWithoutRef<InputProps> & React.RefAttributes<HTMLInputElement>> = React.forwardRef((
    { className, variant, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
) => {
    const variantClass = variant;
    return <input ref={ref} className={cn(inputVariants({variant}),className)} {...props}>{props.children}</input>;
});

export default Input;
