"use client"
import LoginModal from "@/components/LoginPage/LoginModal";
import { useEffect,useState } from "react"

export const LoginModalProvider = () =>{
    const [isMounted,setIsMounted] = useState<boolean>(false);

    useEffect(()=>{
        setIsMounted(true);
    },[]);

    if(!isMounted)
        return null;
    return (
        <>
            <LoginModal/>
        </>
    )
}