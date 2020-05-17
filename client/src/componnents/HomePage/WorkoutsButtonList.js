import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttons: {
    opacity: "1",
    "&:hover": { opacity: "0.7" },
  },
}));

export const WorkoutsButtonList = ({ Dates, date, setSaved, show }) => {
  const [hours, sethours] = useState([]);
  const classes = useStyles();

  const onClick = async (a) => {
    // console.log(a);
    const newWorkout = new Date(moment(date).format("MM-DD-YYYY"));
    console.log(newWorkout);
    try {
      const res = await axios.post("/api/workouts/", {
        date: newWorkout,
        hours: [a],
      });
      console.log(res.data);
      setSaved(true);
    } catch (e) {
      // setErrors(e.response.data.errors[0].msg);
      console.log(e.response.data.errors[0].msg);
    }
  };

  useEffect(() => {
    Dates.forEach((d) => {
      if (
        moment(date).format("DD-MM-YYYY") ===
        moment(d.date).format("DD-MM-YYYY")
      ) {
        sethours(d.hours);
        return;
      }
    });
  }, [date, Dates]);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {show
          ? hours.map((a) => (
              <Grid key={a} item md={2} sm="auto" xs="auto">
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
            ))
          : null}
      </Grid>
    </div>
  );
};

export default WorkoutsButtonList;
