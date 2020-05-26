import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Grid, Card, CardContent } from "@material-ui/core";
import MyTextField from "./Input/Input";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/actions/authActions";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email not valid")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be 5 characters or longer")
    .required("password is required"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",
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

  useEffect(() => {
    if (user && (user.user.rank === 1 || user.user.rank === 0)) {
      history.push("/TrainerHomePage");
    } else if (user && user.user.rank === 2) history.push("/");
  }, [user, history]);

  return (
    <Grid container justify="center" style={{ marginTop: "3em" }}>
      <Grid item xs={10} sm={8} lg={6} xl={4}>
        <Card className={classes.root}>
          <CardContent>
            <Typography align="center" variant="h3">
              Login
            </Typography>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                try {
                  const res = await axios.post("/api/login/", values);
                  const { token } = res.data;
                  dispatch(setUser(token));
                  if (user.user.rank === 1 || user.user.rank === 0) {
                    history.push("/TrainerHomePage");
                  } else {
                    console.log(user.user);
                    history.push("/");
                  }
                } catch (e) {
                  setErrors(e.response.data.errors[0].msg);
                  actions.resetForm();
                }
              }}
            >
              {(values, isSubmitting) => (
                <Form>
                  <MyTextField
                    key="1"
                    name="email"
                    type="email"
                    label="Email"
                  />
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
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
