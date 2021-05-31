import { Link } from "react-router-dom";
import React from "react";

const Navbar = () =>{
	return(
	<nav className="navbar ">
        <Link to="/blogs" className="navlink">BLOGS</Link>  
        <div className="navlink">Admin</div>      
   </nav>
   )
}

export default Navbar;