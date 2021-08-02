import {Link} from "react-router-dom";
export default function Main(){
    return <>
    <h1>Hey There!</h1> <br/>
    <h2> Welcome to Invoice generation web app</h2> <br/>
    <h3> Click <Link to="/login">here</Link>to login</h3>
    </>
}