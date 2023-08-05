export default async function getAllCommunities(){
    const res = await fetch("http://localhost:3000/api/community",{next:{revalidate:60}});
    if(!res)
        return null;
    const data = await res.json();

    return data;
}