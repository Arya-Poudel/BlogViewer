import React, { useState } from "react";
import { Link } from 'react-router-dom';

const CreateBlogComment = ({ blogId }) =>{

	const [message, setMessage] = useState('');

	const handleFormSubmit = (e) => {
		e.preventDefault();

		let formdata = new FormData(document.getElementById('comment_form'))

		fetch(`https://hidden-eyrie-46633.herokuapp.com/blogs/${blogId}/comments`, {
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
	<div className="createblogcomments">
        <h1 style={{textAlign: "center", margin: "10px"}}> Add new comment </h1>

        <form id="comment_form"  onSubmit={handleFormSubmit} className="form_div" autoComplete="off">
        	<label htmlFor="name">Username*:</label>
        	<input type="text" id="name" name="name" required/>
        	<label htmlFor="comment">Comment*:</label>
        	<textarea name="comment" id="comment" minLength="5"></textarea>
        	<div className="btn-links">
	        	<button type="submit" className="linkBtn">Submit</button>
	        	<Link to={`/blogs/${blogId}/comments/`}>
		        	<button type="button" className="linkBtn">Go Back</button>
		        </Link>
	        </div>
        </form>
        <p style={{textAlign: "center", fontWeight: "bold"}}>{message}</p>
   </div>
   )
}

export default CreateBlogComment;