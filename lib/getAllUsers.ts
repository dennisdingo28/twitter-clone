export default async function getAllUsers(){
    const res = await fetch("http://localhost:3000/api/user");
    if(!res)
        return null;
    const data = await res.json();

    return data;
}