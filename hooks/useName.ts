export function useName(){
    const username = localStorage.getItem("username")
    return username==null ? "username" : username
}