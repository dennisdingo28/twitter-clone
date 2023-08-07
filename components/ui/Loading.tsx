"use client"

import { Suspense } from "react";
import Paragraph from "./paragraph";

interface LoadingProps {
    loadingMessage:string;
    content: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({loadingMessage,content}) => {
  return (
    <Suspense fallback={<Paragraph>{loadingMessage}</Paragraph>}>
        {content}
    </Suspense>
  )
}

export default Loading
