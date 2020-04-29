import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Fade, Button, Box, Hidden } from "@material-ui/core";
import MyTextField from "../Input/Input";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  centerDiv: {
    textAlign: "center",
  },
  button: {
    transform: "translateY(10rem)",
    backgroundColor: "#202020",
    transition: "all .3s ease",
    color: "white",
    opacity: 0.7,
    "&:hover": { opacity: 1, backgroundColor: "#202020" },
  },
  buttonClicked: {
    backgroundColor: "#202020",
    color: "white",
    transform: "translateY(-5rem)",
    opacity: 0,
    visibility: "hidden",
    transition: "all .6s ease",
  },
  backButton: {
    marginLeft: "1rem",
    backgroundColor: "transparent",
    "&:hover": { opacity: 1, backgroundColor: "transparent" },
  },
  backIcon: {
    color: "#202020",
    opacity: 0.6,
    "&:hover": { opacity: 1 },
  },
  vanish: {
    visibility: "hidden",
  },
}));

export const HomePage = () => {
  const [showButton, setShowButton] = useState(true);
  const classes = useStyles({ showButton });
  const [date, setDate] = useState(new Date());

  const toggleButton = () => {
    setShowButton(!showButton);
  };

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div>
      <Box display="flex" justifyContent="center">
        <Button
          size="large"
          className={showButton ? classes.button : classes.buttonClicked}
          onClick={toggleButton}
        >
          Schedule a workout
        </Button>
      </Box>
      <Button
        size="large"
        className={classes.backButton}
        variant="outlined"
        onClick={toggleButton}
        disableRipple
      >
        <ArrowBackIcon className={classes.backIcon} />
      </Button>

      <Fade in={!showButton} timeout={{ enter: 1000 }}>
        <Box display="flex" justifyContent="center">
          <Calendar onChange={onChange} value={date} />
        </Box>
      </Fade>
      {moment(date).format("DD/MM/YYYY")}
    </div>
  );
};

export default HomePage;

// const images = [
//   {
//     original: "https://picsum.photos/id/1018/1000/600/",
//     thumbnail: "https://picsum.photos/id/1018/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1015/1000/600/",
//     thumbnail: "https://picsum.photos/id/1015/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1019/1000/600/",
//     thumbnail: "https://picsum.photos/id/1019/250/150/",
//   },
// ];
{
  /* <Container>
      <ImageGallery items={images} />
    </Container> */
}
