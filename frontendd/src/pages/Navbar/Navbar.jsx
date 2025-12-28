import { NavLink } from "react-router-dom";

export function Navbar(){
    return(
        <>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/post">Post</NavLink>
        <NavLink to="/postdata">Postdata</NavLink>
        </>
    )
}