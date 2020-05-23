import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@material-ui/core";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
    bottom: 0,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: theme.spacing(1),
    color: "red",
  },
}));

export const WorkoutsScheduled = ({ userID }) => {
  const [scheduled, setscheduled] = useState([]);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const convertType = (type) => {
    if (type === 1) return "Solo Workout";
    if (type === 2) return "Couple Workout";
    if (type === 3) return "Trio Workout";
    else return "Other";
  };
  useEffect(() => {
    async function fetch() {
      const res = await Axios.get(`api/trainees/scheduled/${userID}`);
      if (res.data.length !== 0) {
        console.log(res.data);
        setscheduled(res.data);
      }
    }
    fetch();
  }, []);

  const onClick = async (workoutID, workoutDate, hour) => {
    try {
      const res = await Axios.put("api/trainees/deleteWorkout", {
        workoutID,
        userID,
        workoutDate,
        hour,
      });
      console.log(res.data);
    } catch (e) {
      console.log(e.response.data.errors[0].msg);
    }
  };

  const prettyDate = (date) => {
    return moment(date).format("DD/MM");
  };

  return (
    <>
      <Typography
        color="primary"
        variant="h6"
        style={{ position: "absolute", left: 0, width: "100%" }}
      >
        Workouts scheduled for the next two weeks
      </Typography>
      {scheduled.map((s) => (
        <Card className={classes.root} key={s._id}>
          <CardContent>
            <Typography variant="h6" component="h2">
              {bull} Date: {prettyDate(s.date)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {bull} Hour: {s.hour}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {bull} Type: {convertType(s.type)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              className={classes.button}
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => onClick(s._id, s.date, s.hour)}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default WorkoutsScheduled;
