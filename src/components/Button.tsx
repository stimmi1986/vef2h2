const deleter = async (event)=>{
    event.preventDefault();
    const result = await fetch(event.target.value,{
      method:"DELETE"
    });
    window.location = "."
}
export function delButton(here){
    return (<>
        <button className={styles.button} onClick={deleter} type="button" value={here}><p>Delete</p></button>
    </>);
}
const linker = async (event)=>{
    event.preventDefault();
    window.location.href=event.target.value
}
export const submitButton = (<button className={styles.button} type="submit"><p>Submit</p></button>)
export function hrefButton(h,text){
    return(<>
    <button className={styles.button} onClick={linker} type="button" value={h}>{text}</button>
    </>);
}
export function deildButton(h,text){
    return(<>
        <button className={styles.card} onClick={linker} type="button" value={h}>{text}</button>
        </>);

}
