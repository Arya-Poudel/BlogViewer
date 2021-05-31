import React, { useState } from "react";
import { Link } from 'react-router-dom';

const CreateBlogComment = ({ blogId }) =>{

	const [message, setMessage] = useState('');

	const handleFormSubmit = (e) => {
		e.preventDefault();

		let formdata = new FormData(document.getElementById('comment_form'))

		fetch(`http://localhost:5000/blogs/${blogId}/comments`, {
			  mode : 'cors',
			  method: "post",
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			  },
			  //serialize the JSON body
			  body: JSON.stringify(Object.fromEntries(formdata)) }) 
		.then(response => {
				if(!response.ok) {
				        throw new Error("ERROR: HTTP status " + response.status);
			    }
				return response.json() 
		})
		.then(data => setMessage(data.message))
		.catch(err => setMessage(err.message));
	}

	return(
	<div className="createblogcomments ">
        <h1 style={{textAlign: "center", margin: "10px"}}> Add new comment </h1>

        <form id="comment_form"  onSubmit={handleFormSubmit} className="form_div">
        	<label htmlFor="name">Username:</label>
        	<input type="text" id="name" name="name" required/>
        	<label htmlFor="comment">Comment:</label>
        	<input type="text" id="comment" name="comment" minLength="5" required/>
        	<button type="submit" className="linkBtn">Submit</button>
        	<Link to={`/blogs/${blogId}/comments/`}>
	        	<button type="button" className="linkBtn">Cancel</button>
	        </Link>
        </form>
        <p className="message-post">{message}</p>
   </div>
   )
}

export default CreateBlogComment;