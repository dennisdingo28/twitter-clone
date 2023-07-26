import bcrypt from "bcrypt";

export default async function compareValues(candidatePassword: string, hashedPassword: string){
    try{
        const match = await bcrypt.compare(candidatePassword,hashedPassword);
        return match;
    }catch(err){
        console.log(err);
        return false;
    }
}