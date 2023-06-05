export const Auth = () => {
    return (
        <button onClick= {() => {console.log(localStorage.getItem("encodedToken"))}}>Get Token</button>
    )
}