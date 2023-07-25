import { SignUpRequest } from "@/validators";
import axios from "axios";

export default async function createAccount(data: SignUpRequest){
    const res = await axios.post('/api/user',data);

    return res.data;
}