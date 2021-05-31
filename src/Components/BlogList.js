import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';

const BlogList = () =>{

	const [bloglist, setBlogList] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		fetch('https://hidden-eyrie-46633.herokuapp.com/blogs', {mode : 'cors'})
 		.then(response => {
 			 if (!response.ok) {
		        throw new Error("ERROR: HTTP status " + response.status);
		    }
 			return response.json();
 		})
  		.then(data => setBlogList(data))
  		.catch(err => setErrorMessage(err.message))
	}, [])

	
	return(
	<>
		<h1 style={{textAlign: "center"}}> BlogList </h1>
		{!errorMessage && 
			<div>
		        {bloglist.map(blog => (
		        	<Link to={`/blogs/${blog._id}`} key={blog._id} className="link">
						<div className="blog"> 
							<h1 style={{textAlign: "center"}}>{blog.title}</h1>
							<p className="blogDesc">{blog.truncated_text} ......</p>
						</div>
					</Link>
		   
				   )
				)}
			</div>
		}
		{errorMessage &&
			 <p style={{textAlign: "center", fontWeight:"bold"}}>
			 	{errorMessage}
			 </p>
		}
	</>
  );
}

export default BlogList;