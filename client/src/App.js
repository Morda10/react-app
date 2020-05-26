import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import Navbar from "../src/UI/Navbar/Navbar";
import Login from "./componnents/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./componnents/Register";
import HomePage from "./componnents/HomePage/HomePage";
import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import AdminRoutes from "./AdminRoutes";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./UI/Theme";
import TrainerRoutes from "./TrainerRoutes";
import { TrainerHomePage } from "./componnents/TrainerHomePage/TrainerHomePage";

const App = () => {
  const user = useSelector((state) => state.user);
  const [routing, setRouting] = useState([{ to: "/Login", name: "Login" }]);

  useEffect(() => {
    if (user) {
      if (user.user.rank === 2) {
        setRouting([{ to: "/", name: "Home" }]);
      } else if (!user.user.rank || user.user.rank === 1) {
        setRouting([
          { to: "/TrainerHomePage", name: "Home" },
          { to: "/Register", name: "Register" },
        ]);
      }
    } else {
      setRouting([{ to: "/Login", name: "Login" }]);
    }
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Fragment>
          <Navbar routing={routing} />
          <div style={{ marginBottom: 80 }}>
            <Switch>
              <PrivateRoute exact path="/" component={HomePage} />
              <TrainerRoutes
                exact
                path="/TrainerHomePage"
                component={TrainerHomePage}
              />
              <Route exact path="/Login" component={Login} />
              <TrainerRoutes exact path="/Register" component={Register} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ThemeProvider>
  );
};

export default App;
