import React, { HTMLAttributes, ForwardedRef } from 'react';
import { cva, VariantProps } from "class-variance-authority";
import { cn } from '@/lib/utils/cn';

const paragraphVariants = cva("text-gray-200", {
    variants: {
        variant: {
            "default": "font-normal",
            "destructive":"text-red-500",
        },
        size:{
            default:"font-normal",
            sm:"text-[.9em]",
            md:"text-[1.1em]",
            lg:"text-[1.3em]",
        }
    },
    defaultVariants: {
        variant: "default",
        size:"sm"
    }
});

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof paragraphVariants> {};

const Paragraph: React.ForwardRefExoticComponent<React.PropsWithoutRef<ParagraphProps> & React.RefAttributes<HTMLParagraphElement>> = React.forwardRef((
    { className, variant, ...props }: ParagraphProps,
    ref: ForwardedRef<HTMLParagraphElement>,
) => {
    const variantClass = variant;
    return <p ref={ref} className={cn(paragraphVariants({variant}),className)} {...props}>{props.children}</p>;
});

export default Paragraph;
