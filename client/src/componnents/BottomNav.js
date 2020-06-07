import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Fade from "@material-ui/core/Fade";
import AssessmentIcon from "@material-ui/icons/Assessment";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LineWeightIcon from "@material-ui/icons/LineWeight";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
});

export default function BottomNav({ routing }) {
  const classes = useStyles();
  const [value, setValue] = useState("workouts");
  const [loadNav, setloadNav] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          label="Measures"
          value="measures"
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
