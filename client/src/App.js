import React, { Fragment } from "react";
import "./App.css";
import Navbar from "../src/UI/Navbar/Navbar";
import Login from "./componnents/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./componnents/Register";
import HomePage from "./componnents/HomePage";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const routing = [
    { to: "/", name: "Home" },
    { to: "/Login", name: "Login" },
    { to: "/Register", name: "Register" },
  ];

  return (
    <Router>
      <Fragment>
        {/* <h1>Counter: {counter} </h1>
        <button onClick={() => dispatch({ type: "INCREMENT" })}>
          INCREMENT
        </button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>
          DECREMENT
        </button> */}
        <Navbar routing={routing} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Register" component={Register} />
        </Switch>
      </Fragment>
    </Router>
  );
};

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
