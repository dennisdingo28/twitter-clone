import { UserJwtPayload } from "@/types";
import jwt from "jsonwebtoken";

export default function generateJWT(payload: UserJwtPayload){
    return jwt.sign(payload,process.env.JWT_ENCRYPTION!,{expiresIn:"30d"});
}