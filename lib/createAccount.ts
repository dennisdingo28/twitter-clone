import { SignUpRequest } from "@/validators";
import axios from "axios";

export default async function createAccount(data: SignUpRequest){
    const res = await axios.post('/api/user',data);
    console.log("Res",res);
    
    return {msg:"created",status:200};
}