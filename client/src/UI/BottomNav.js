import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Fade from "@material-ui/core/Fade";
import AssessmentIcon from "@material-ui/icons/Assessment";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LineWeightIcon from "@material-ui/icons/LineWeight";
import {  useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {setBottomNavTab} from '../redux/reducers/UserReducer'


const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
});

export default function BottomNav() {
  const classes = useStyles();
  const bottomNavTab = useSelector(state => state.bottomNavTab)
  const dispatch = useDispatch()
  const [value, setValue] = useState(bottomNavTab);
  // const [value, setValue] = useState("workouts");
  const [loadNav, setloadNav] = useState(false);
  const history = useHistory()

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(setBottomNavTab({bottomNavTab: newValue}))
    console.log(bottomNavTab)
    if(newValue !== "workouts")
     { history.push("/Trainee/" + newValue)  }
    else{
     history.push("/Trainee")
    }
  };

  useEffect(() => {
    setloadNav(true);
    return () => {
      setloadNav(false);
    };
  }, []);

  return (
    <Fade in={loadNav} timeout={{ enter: 500 }}>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.root}
        showLabels
      >
        <BottomNavigationAction
          label="Workouts"
          value="workouts"
          icon={<FitnessCenterIcon />}
        />
        <BottomNavigationAction
          label="Measurements"
          value="Measurements"
          icon={<AssessmentIcon />}
        />
        <BottomNavigationAction
          label="Series"
          value="series"
          icon={<LineWeightIcon />}
        />
        <BottomNavigationAction
          label="Nutrition"
          value="nutrition"
          icon={<FastfoodIcon />}
        />
      </BottomNavigation>
    </Fade>
  );
}
