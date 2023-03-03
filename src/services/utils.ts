export function formatDate(unixDate:number) {
    const date = new Date(unixDate * 1000)
    return (date.toLocaleDateString("en-US"))
}