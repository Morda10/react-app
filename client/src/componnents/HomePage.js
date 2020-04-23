import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Card, CardContent, Button, Container } from "@material-ui/core";
import MyTextField from "./Input/Input";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

export const HomePage = () => {
  return (
    <Container>
      <ImageGallery items={images} />
    </Container>
  );
};

export default HomePage;
