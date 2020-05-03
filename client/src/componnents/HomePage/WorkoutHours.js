import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, Typography } from "@material-ui/core";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttons: {
    opacity: "0.7",
    "&:hover": { opacity: "1" },
  },
}));

export const WorkoutHours = (props) => {
  const classes = useStyles();
  let date = props.date;
  const suffix = ":00";
  //   const halfHour = ":30";
  const [s, setS] = useState([]);
  const StartWork = 10;
  const LastWorkout = 22;
  const [workOutSaved, setworkOutSaved] = useState(false);
  const success = "Workout saved successfully";

  const hour_range = (start, finish) => {
    const res = [start.toString().concat(suffix)];
    let s = start;
    while (s !== finish) {
      s = (s + 1) % 24;
      res.push((s % 24).toString().concat(suffix));
    }

    return res;
  };

  const toggleSaved = () => {
    setworkOutSaved(false);
  };

  useEffect(() => {
    toggleSaved();
  }, [date]);

  const allHours = hour_range(StartWork, LastWorkout);
  const avalibleHours = allHours.filter((h) => !s.includes(h));
  // console.log(avalibleHours);
  //remember to add option to change type of workout
  const onClick = async (a) => {
    const newWorkout = moment.utc(date + " " + a, "DD-MM-YYYY HH:mm").format();
    // console.log(date);
    try {
      const res = await axios.post("/api/workouts/", { date: newWorkout });
      console.log(res.data);
      setworkOutSaved(true);
    } catch (e) {
      // setErrors(e.response.data.errors[0].msg);
      console.log(e.response.data.errors[0].msg);
    }
  };

  const workoutsHours = avalibleHours.map((a) => (
    <Grid key={a} item md={1} sm={2} xs={3}>
      <Button
        color="primary"
        className={classes.buttons}
        fullWidth
        variant="contained"
        onClick={() => onClick(a)}
      >
        {a}
      </Button>
    </Grid>
  ));

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/api/workouts/${date}`);
        // console.log(res.data);
        if (res) {
          const arr = [];
          res.data.map((r) => {
            const hour = moment.utc(r.date).format("HH:mm");
            arr.push(hour);
            return true;
          });
          // console.log(arr);
          setS(arr);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, [date]);

  return (
    <div>
      <div className={classes.root}>
        {workOutSaved ? (
          <Typography variant="h6" color="primary">
            {success}
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {workoutsHours}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default WorkoutHours;
