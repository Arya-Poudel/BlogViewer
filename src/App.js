import React from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from './Components/Navbar';
import BlogList from './Components/BlogList';
import BlogDetail from './Components/BlogDetail';
import BlogComments from './Components/BlogComments';
import CreateBlogComment from './Components/CreateBlogComment';


function App() {

  return (
    <>
    <Router basename="/">
       <Navbar />
       <Switch>
          <Route exact path="/" component={BlogList} />
          <Route exact path="/blogs" component={BlogList} />
          <Route exact path="/blogs/:id" 
                  render = {routeProps => (
                    <BlogDetail blogId={routeProps.match.params.id}  />
                  )}
          />
          <Route exact path="/blogs/:id/comments"
                 render = {routeProps => (
                      <BlogComments blogId={routeProps.match.params.id} />
                  )} 
          />
          <Route exact path="/blogs/:id/comments/new"
                 render = {routeProps => (
                      <CreateBlogComment blogId={routeProps.match.params.id} />
                  )} 
           />
       </Switch>
    </Router>
    </>
  );
}

export default App;