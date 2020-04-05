import React,{useState} from 'react';
import './App.css';
import Navbar from '../src/UI/Navbar/Navbar';
import Login from './componnents/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Register from './componnents/Register';

const App = () => {

  const routing = [
   { to: "/",
    name: "Login"},
    {to: "/Register",
      name: "Register"}
  ];
 
  return (
    <Router>
    <div>
      {/* <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul> */}
      <Navbar routing={routing}/>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/Register">
          <Register />
        </Route>
      </Switch>
    </div>
  </Router>
);
}

export default App;
 // <BrowserRouter>
      //   <React.Fragment>
      //     <nav>
      //       <NavLink to="/user">User Page</NavLink> |&nbsp;
      //       <NavLink to="/posts">Posts Page</NavLink>
      //     </nav>
      //     <Route path="/" component={Welcome} exact />
      //     <Route path="/user" component={User} />
      //     <Route
      //       path="/posts"
      //       render={() => (
      //         <Suspense fallback={<div>Loading...</div>}>
      //           <Posts />
      //         </Suspense>
      //       )}
      //     />
      //   </React.Fragment>
      // </BrowserRouter>