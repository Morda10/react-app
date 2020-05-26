import React, { useState, useEffect } from "react";
import { Fade, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import moment from "moment";
import axios from "axios";
import WorkoutsButtonList from "./WorkoutsButtonList";
import MyCalendar from "./MyCalendar";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import BottomNav from "../BottomNav";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  centerDiv: {
    textAlign: "center",
  },
  button: {
    transform: "translateY(10rem)",
    backgroundColor: "#202020",
    transition: "all .2s ease",
    color: "white",
    opacity: 1,
    "&:hover": { opacity: 0.7, backgroundColor: "#202020" },
  },
  buttonClicked: {
    color: "white",
    transform: "translateY(-5rem)",
    marginBottom: "-2rem",
    opacity: 0,
    visibility: "hidden",
    transition: "all .6s ease",
  },
  backButton: {
    marginTop: 0,
    marginLeft: "1rem",
    marginBottom: "1rem",
    backgroundColor: "transparent",
    "&:hover": { opacity: 1, backgroundColor: "transparent" },
  },
  backIcon: {
    opacity: 0.6,
    "&:hover": { opacity: 1 },
  },
  vanish: {
    visibility: "hidden",
  },
}));

export const HomePage = () => {
  const history = useHistory();
  const [date, setdate] = useState(new Date());
  const [showButton, setshowButton] = useState(true);
  const [Dates, setDates] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [workOutSaved, setworkOutSaved] = useState(false);
  const { user } = useSelector((state) => state.user);
  const classes = useStyles({ showButton });
  const today = new Date();

  useEffect(() => {
    if (user.rank !== 2) {
      history.push("/TrainerRoutes");
    }
  }, []);

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#hours"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const toggleButton = (e) => {
    if (showButton) {
      handleClick(e);
    }
    setshowButton(!showButton);
  };

  const onChange = (date) => {
    // console.log(date);
    if (typeof date.format === "function") {
      setdate(date.format());
      console.log(date.format());
      setworkOutSaved(false);
    } else {
    }
  };

  useEffect(() => {
    const today = new Date();
    const formatted = moment(today).format("DD-MM-YYYY");
    async function fetchData() {
      const res = await axios.get(`/api/workouts/${formatted}`);
      if (res.data.length !== 0) {
        setDates(res.data);
      }
    }
    try {
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [workOutSaved, deleted]);

  useEffect(() => {
    if (workOutSaved) {
      setTimeout(() => {
        setworkOutSaved(false);
      }, 2000);
    }
  }, [workOutSaved]);

  return (
    <div>
      <Box display="flex" justifyContent="center">
        <Button
          color="primary"
          size="large"
          className={showButton ? classes.button : classes.buttonClicked}
          onClick={toggleButton}
        >
          Schedule a workout
        </Button>
      </Box>
      <Button
        color="primary"
        size="large"
        className={showButton ? classes.vanish : classes.backButton}
        variant="outlined"
        onClick={toggleButton}
        disableRipple
      >
        <ArrowBackIcon className={classes.backIcon} />
      </Button>

      <Fade in={!showButton} timeout={{ enter: 1000 }}>
        <Box display="flex" justifyContent="center">
          <MyCalendar date={date} today={today} onChange={onChange} />
        </Box>
      </Fade>
      <br />
      <div className={classes.root}>
        {workOutSaved ? (
          <h1 className="title">
            <DoneAllIcon
              color="primary"
              fontSize="large"
              style={{ position: "relative" }}
            />
          </h1>
        ) : (
          <Fade in={!showButton} timeout={{ enter: 1000 }}>
            <Box justifyContent="center">
              <WorkoutsButtonList
                Dates={Dates}
                date={date}
                setSaved={setworkOutSaved}
                show={!showButton}
                deleted={deleted}
                setDeleted={setDeleted}
              />
            </Box>
          </Fade>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default HomePage;
