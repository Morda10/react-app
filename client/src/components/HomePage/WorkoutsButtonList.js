import React, { useState, useEffect } from "react";
import { Button, Box, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";
import WorkoutsScheduled from "./WorkoutsScheduled";
import Loading from '../../UI/Loading/Loading'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    // maxWidth: "20em",
    overflowX: "auto",
    whiteSpace: "nowrap",
    height: "5rem",
    width: (p) => (p.matches ? "100%" : "20em"),
  },
  buttons: {
    color: "white",
    display: "inline-block",
    marginLeft: "0.2em",
    marginRight: "0.2em",
    border: "0",
    padding: "0.5em 1.25em",
    background: "linear-gradient(90deg, #272727, #7f8685, #adadad)",
    backgroundSize: "150%",
    backgroundPosition: "left",
    transition: "background-position 400ms",
    "&:hover": { backgroundPosition: "right" },
  },
}));

export const WorkoutsButtonList = ({
  Dates,
  date,
  setSaved,
  show,
  deleted,
  setDeleted,
}) => {
  const matches = useMediaQuery("(min-width:600px)");
  const classes = useStyles({ matches });
  const [hours, sethours] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const userObj = useSelector((state) => state.user);
  const userID = userObj.user.id;


  const onClick = async (a) => {
    const newWorkout = new Date(moment(date).format("MM-DD-YYYY"));
    setLoading(true)
    try {
      const res = await axios.post("/api/workouts/", {
        date: newWorkout,
        hours: [a],
        userID: userID,
      });
      console.log(res.data);
      setSaved(true);
      setLoading(false)
    } catch (e) {
      setErrors(e.response.data.errors[0].msg);
      // console.log(e.response.data.errors[0].msg);
    }
  };

  useEffect(() => {
    let found = false;
    Dates.forEach((d) => {
      if (
        moment(date).format("DD-MM-YYYY") ===
        moment(d.date).format("DD-MM-YYYY")
      ) {
        found = true;
        sethours(d.hours);
        return;
      }
    });
    if (!found) sethours([]);
  }, [date, Dates, deleted]);

  const hoursMap = (hours.map((a) => (
      <Button
        key={a}
        fullWidth
        className={classes.buttons}
        variant="contained"
        size="small"
        onClick={() => onClick(a)}
      >
        {a}
      </Button>
    )))

  return (
    <>
      {loading ? <Loading/> : 
        (<Box id={"hours"} className={classes.root}>
        {show
          ? hoursMap
          : null}
        {errors}
      </Box>)}

      <WorkoutsScheduled
        userID={userID}
        deleted={deleted}
        setDeleted={setDeleted}
      />
    </>
  );
};

export default WorkoutsButtonList;
