"use client"

import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"

const ToasterProivder = () =>{
    const [mounted,setMounted] = useState<boolean>(false);

    useEffect(()=>{
        setMounted(true);
    },[]);
    if(!mounted)
        return null;
    return (
        <Toaster/>
    )
}

export default ToasterProivder;