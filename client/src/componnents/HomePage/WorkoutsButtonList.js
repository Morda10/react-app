import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    maxWidth: "20em",
    overflowX: "auto",
    whiteSpace: "nowrap",
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

export const WorkoutsButtonList = ({ Dates, date, setSaved, show }) => {
  const [hours, sethours] = useState([]);
  const classes = useStyles();
  const [errors, setErrors] = useState(null);

  const onClick = async (a) => {
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
      setErrors(e.response.data.errors[0].msg);
      // console.log(e.response.data.errors[0].msg);
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
    <Grid container justify="center">
      <Grid
        item
        className={classes.root}
        ref={(el) => {
          gridref = el;
        }}
        xs={10}
        sm={12}
        md={12}
      >
        {show
          ? hours.map((a) => (
              <Button
                key={a}
                className={classes.buttons}
                variant="contained"
                size="small"
                onClick={() => onClick(a)}
              >
                {a}
              </Button>
            ))
          : null}
        {errors}
      </Grid>
    </Grid>
  );
};

export default WorkoutsButtonList;

// <div
// className={classes.root}
// ref={(el) => {
//   gridref = el;
// }}
// >
// {/* <Grid container spacing={2}> */}
//   {show
//     ? hours.map((a) => (
//         // <Grid key={a} item md={2} sm="auto" xs="auto">
//           <Button
//             color="white"
//             className="hours"
//             fullWidth
//             variant="contained"
//             onClick={() => onClick(a)}
//           >
//             {a}
//           </Button>
//         {/* </Grid> */}
//       ))
//     : null}
// {/* </Grid> */}
// </div>

{
  /* <div
      className={classes.root}
      ref={(el) => {
        gridref = el;
      }}
    >
      {show
        ? hours.map((a) => (
            <Button
              key={a}
              className={classes.buttons}
              fullWidth
              variant="contained"
              onClick={() => onClick(a)}
            >
              {a}
            </Button>
          ))
        : null}
      {errors}
    </div>
  );
}; */
}
