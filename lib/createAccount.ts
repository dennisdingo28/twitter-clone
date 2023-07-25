import { SignUpRequest } from "@/validators";

export default async function createAccount(data: SignUpRequest){
    console.log(data);
    return {msg:"created",status:200};
}