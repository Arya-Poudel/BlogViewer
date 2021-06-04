import { Link } from "react-router-dom";
import React from "react";

const Navbar = () =>{
	return(
	<nav className="navbar ">
        <h1>DEMO BLOG</h1>
        <div>
            <Link to="/blogs" className="navlink">BLOGS</Link>  
            <a href="https://arya-poudel.github.io/BlogAdmin/#/" target="blank" className="navlink">ADMIN</a>    
       </div>
   </nav>
   )
}

export default Navbar;