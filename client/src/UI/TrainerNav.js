import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Fade from "@material-ui/core/Fade";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LineWeightIcon from "@material-ui/icons/LineWeight";
import ScheduleIcon from "@material-ui/icons/Schedule";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
});

export default function TrainerNav() {
  const classes = useStyles();
  const [value, setValue] = useState("schedule");
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
          label="Schedule"
          value="schedule"
          icon={<ScheduleIcon />}
        />
        <BottomNavigationAction
          label="Trainees"
          value="trainees"
          icon={<SupervisedUserCircleIcon />}
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
