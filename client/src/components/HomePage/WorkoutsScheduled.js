import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Container,
  Grid,
  useMediaQuery,
} from "@material-ui/core";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: "auto",
    whiteSpace: "nowrap",
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
  card: {
    justifyContent: "center",
    width: "100%",
    // width: (p) => (p.matches ? "100%" : "auto"),
  },
}));

export const WorkoutsScheduled = ({ userID, deleted, setDeleted }) => {
  const [scheduled, setscheduled] = useState([]);
  const [loading, setLoading] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");
  const classes = useStyles({ matches });
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
        setDeleted(false);
      } else {
        setscheduled([]);
        setDeleted(false);
      }
    }
    setLoading(true)
    fetch();
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleted]);

  const onClick = async (workoutID, workoutDate, hour) => {
    try {
      setLoading(true)
      const res = await Axios.put("api/trainees/deleteWorkout", {
        workoutID,
        userID,
        workoutDate,
        hour,
      });
      console.log(res.data);
      setDeleted(true);
      setLoading(false)
    } catch (e) {
      console.log(e.response.data.errors[0].msg);
    }
  };

  const prettyDate = (date) => {
    return moment(date).format("DD/MM");
  };

  const scheduledWorkouts = scheduled.map((s) => (
    <Grid item key={s._id} xs={6}>
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        mb={1}
      >
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" component="h2">
              {bull} Date: {prettyDate(s.date)}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {bull} Hour: {s.hour}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {bull} Type: {convertType(s.type)}
            </Typography>
          </CardContent>
          <CardActions>
            {loading ? <CircularProgress align='center'/> : 
              (<Button
              className={classes.button}
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => onClick(s._id, s.date, s.hour)}
            >
              Delete
            </Button>)}
          </CardActions>
        </Card>
      </Box>
    </Grid>
  ))

  return (
    <Container>
      <Typography
        color="primary"
        variant="h6"
        align="center"
        style={{ marginBottom: "1em", marginTop: "1em", fontWeight: "bolder" }}
      >
        Workouts scheduled
      </Typography>
      <Grid container>
        {loading ? <CircularProgress  align='center'/> : scheduledWorkouts}
      </Grid>
    </Container>
  );
};

export default WorkoutsScheduled;
