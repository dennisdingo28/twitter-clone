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
        <Toaster toastOptions={{
            style:{
                background:"#1e1e1e",
                color:"white",
              },
              iconTheme: {
                primary: '#000',
                secondary: '#1b9aef',
              },
        }}/>
    )
}

export default ToasterProivder;