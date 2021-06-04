import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';

const BlogComment = ({ blogId, title }) =>{

	const [blogComments, setBlogComments] = useState([]);
	const [blogTitle, setBlogTitle] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [message, setMessage] = useState('');

	useEffect(() => {
		fetch(`https://hidden-eyrie-46633.herokuapp.com/blogs/${blogId}/comments`, {mode : 'cors'})
 		.then(response => {
 			 if (!response.ok) {
		        throw new Error("ERROR: HTTP status " + response.status);
		    }
 			return response.json()
 		})
  		.then(data => {
  					 console.log(data);
  					 if(data.length === 0){
  					 	setMessage('No comments')
  					 } else{
  					 	setBlogComments(data) 
  						setBlogTitle(data[0].writtenIn.title)
  					 }
  					
  				})
  		.catch(err => setErrorMessage(err.message))
  		//eslint-disable-next-line
	}, [])

	return(
	<>
	{(!errorMessage && !message) && 
		<div className="blogcomments ">
			<h1 style={{ color: "#fbf8f8"}}>Comments - {blogTitle}</h1>
	        {blogComments.map(comment => (
					<div key={comment._id} className="blogcomment"> 
						<p>{comment.comment}</p>
						<p>By: {comment.name}</p>
					</div>
	   
			   )
			)}
			<div className="btn-links">
				<Link to={`/blogs/${blogId}/comments/new`} className="linkBtn-link">
					<button className="linkBtn ">
						Add a comment
					</button>
				</Link>
				<Link to={`/blogs/${blogId}/`} className="linkBtn-link">
					<button className="linkBtn ">
						Go Back
					</button>
				</Link>
			</div>
	   </div>
	 }
	  {(!errorMessage && message) &&
	  	<div className="blogcomments">
		  	<p>{message}</p>
		  	<div className="btn-links">
					<Link to={`/blogs/${blogId}/comments/new`} className="linkBtn-link">
						<button className="linkBtn ">
							Add a comment
						</button>
					</Link>
					<Link to={`/blogs/${blogId}/`} className="linkBtn-link">
						<button className="linkBtn ">
							Go Back
						</button>
					</Link>
			</div>
		</div>
	  }
	   {errorMessage &&
		 <p style={{textAlign: "center", fontWeight:"bold"}}>
		 	{errorMessage}
		 </p>
		}
   </>
   )
}

export default BlogComment;