import React, { HTMLAttributes, ForwardedRef } from 'react';
import { cva, VariantProps } from "class-variance-authority";
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva("border-lightBlue", {
    variants: {
        variant: {
            "default": "bg-lightBlue text-white font-bold hover:bg-darkBlue duration-100",
            "outline":"border p-1 border-lightBlue text-white font-bold hover:border-darkBlue duration-100",
            "authProvider": "bg-white text-black font-normal hover:bg-gray-200 duration-100 rounded-md px-1 py-1",
            "submit":"bg-white text-black font-semibold hover:bg-gray-200",
            "submitOutline":"bg-transparent border border-white text-black font-semibold hover:bg-gray-200"
        }
    },
    defaultVariants: {
        variant: "default",
    }
});

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {};

const Button: React.ForwardRefExoticComponent<React.PropsWithoutRef<ButtonProps> & React.RefAttributes<HTMLButtonElement>> = React.forwardRef((
    { className, variant, ...props }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    const variantClass = variant;
    return <button ref={ref} className={cn(buttonVariants({variant}),className)} {...props}>{props.children}</button>;
});

export default Button;
