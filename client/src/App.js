import React, { Fragment } from "react";
import "./App.css";
import Navbar from "../src/UI/Navbar/Navbar";
import Login from "./componnents/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./componnents/Register";
import HomePage from "./componnents/HomePage/HomePage";
import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./UI/Theme";

const App = () => {
  const user = useSelector((state) => state.user);

  const routing = user
    ? [{ to: "/", name: "Home" }]
    : [
        { to: "/", name: "Home" },
        { to: "/Login", name: "Login" },
        { to: "/Register", name: "Register" },
      ];

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Fragment>
          <Navbar routing={routing} />
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Register" component={Register} />
          </Switch>
        </Fragment>
      </Router>
    </ThemeProvider>
  );
};

export default App;
