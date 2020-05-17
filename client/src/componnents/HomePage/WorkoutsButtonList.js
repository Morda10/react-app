import React, { useState, useEffect } from "react";
import { Button, Grid, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import axios from "axios";
import "./HomePage.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  let gridref;
  const scrollToBottom = () => {
    gridref.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let found = false;
    Dates.forEach((d) => {
      if (
        moment(date).format("DD-MM-YYYY") ===
        moment(d.date).format("DD-MM-YYYY")
      ) {
        scrollToBottom();
        found = true;
        sethours(d.hours);
        return;
      }
    });
    if (!found) sethours([]);
  }, [date, Dates]);

  return (
    <div
      className={classes.root}
      ref={(el) => {
        gridref = el;
      }}
    >
      <Grid container spacing={2}>
        {show
          ? hours.map((a) => (
              <Grid key={a} item md={2} sm="auto" xs="auto">
                <Button
                  className="hours"
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
