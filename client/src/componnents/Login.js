import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import MyTextField from "./Input/Input";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions/authActions";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email not valid").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be 5 characters or longer")
    .required("password is required"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    backgroundColor: "#202020",
    color: "white",
  },
}));

const Login = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [errors, setErrors] = useState(null);
  // const [token, setToken] = useState("");

  // const tem = () => dispatch(setUser(token));
  if (user) {
    history.push("/");
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          const res = await axios.post("/api/user", values);
          if (res) {
            const { token } = res.data;
            dispatch(setUser(token));
            history.push("/");
          } else {
            setErrors("Invalid email or Password");
          }

          // try {
          //   const res = await axios.post("/api/user", values);
          //   // token = res.data.token;
          //   const tempt = res.data.token;
          //   console.log(tempt);
          //   setToken("tempt");
          //   console.log(token);
          //   //tem();
          //   history.push("/");
          // } catch (e) {
          //   setErrors(e.response.data.errors[0].msg);
          //   actions.resetForm();
          // }
        }}
      >
        {(values, isSubmitting) => (
          <Form className={classes.root}>
            <MyTextField key="1" name="email" type="email" label="Email" />
            <br />
            <MyTextField
              key="2"
              name="password"
              type="password"
              label="Password "
            />
            <br />
            <Button
              className={classes.button}
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              type="submit"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <Typography variant="h6" color="error">
        {errors}
      </Typography>
      {/* <Button
        onClick={() => {
          setToken("dsggegg");
        }}
      >
        gsgsggg
      </Button> */}
    </div>
  );
};

export default Login;
