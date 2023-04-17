

export async function regis(slug:string){
    const regisGet = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/event/${slug}/regis`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        })
        if(!response){

        }
        const dat = await response.json();
        let regs = `<>`;
        for(const d of dat){
            if(!d.name||!d.username){
                continue;
            }
            regs = regs.concat(`<div> <p> ${d.name}</p><p>${d.username}</p>`);
            console.log(regs)
            if(!d.comment){
                regs = regs.concat(`</div>`)
            }else{
                regs =regs.concat(`<p>${d.comment}</p></div>`)
            }
        }regs = regs.concat(`</>`);
        console.log(regs);
        return regs;
        
    }
    return await regisGet();
}