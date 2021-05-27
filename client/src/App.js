import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "../src/UI/Navbar/Navbar";
import Login from "./components/Login and Register/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Login and Register/Register";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/ProtectedRoutes/PrivateRoute";
// import AdminRoutes from "./AdminRoutes";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./UI/Theme";
import TrainerRoutes from "./components/ProtectedRoutes/TrainerRoutes";
import { TrainerHomePage } from "./components/TrainerHomePage/TrainerHomePage";
import HomePage from './components/HomePage/HomePage'
import { Measurements } from "./components/trainee pages/Measurements/Measurements";
import { Series } from "./components/trainee pages/Series/Series";
import { Nutrition } from "./components/trainee pages/Nutrition/Nutrition";
import BottomNav from './UI/BottomNav'

const App = () => {
  const user = useSelector((state) => state.user);
  const uRoutes = [
                   { path: "/Trainee", component: HomePage},
                   { path: "/Trainee/Measurements", component: Measurements},
                   { path: "/Trainee/Series", component: Series},
                   { path: "/Trainee/Nutrition", component: Nutrition},
                    
           ]
  const [routing, setRouting] = useState([{ to: "/", name: "Login" }])
  const userRoutes = uRoutes.map(r => 
    <PrivateRoute key={r.path} exact path={r.path} component={r.component} />
  )


  useEffect(() => {
    if (user) {
      if (user.user.rank === 2) {
        setRouting([{ to: "/Trainee", name: "Home" }]);
      } else if (!user.user.rank || user.user.rank === 1) {
        setRouting([
          { to: "/TrainerHomePage", name: "Home" },
          { to: "/Register", name: "Register" },
        ]);
      }
    } else {
      setRouting([{ to: "/", name: "Login" }]);
    }
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <>
          <Navbar routing={routing} />
          <div style={{ marginBottom: 80 }}>
            <Switch>
              <TrainerRoutes exact path="/TrainerHomePage" component={TrainerHomePage} />
              {/* <Route exact path="/Login" component={Login} /> */}
              <Route exact path="/" component={Login} />
              <TrainerRoutes exact path="/Register" component={Register} />
              {userRoutes}
            </Switch>
          </div>
          {user ? <BottomNav /> : null}
        </>
      </Router>
    </ThemeProvider>
  );
};

export default App;
