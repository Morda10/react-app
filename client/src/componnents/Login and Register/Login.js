import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Checkbox,
} from "@material-ui/core";
import MyTextField from "../Input/Input";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/reducers/UserReducer";

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
  const [isTrainer, setisTrainer] = useState(false);

  const LoginTrainee = async () => {
    try {
      const values = {
        email: "trainee@gmail.com",
        password: "12345",
      };
      const res = await axios.post("/api/login/loginTrainee", values);
      const { token } = res.data;
      dispatch(setUser({ user: token }));
      dispatch(setToken({ token: token }));
      if (user) {
        if (user.user.rank === 1 || user.user.rank === 0) {
          history.push("/TrainerHomePage");
        } else {
          console.log(user.user);
          history.push("/Trainee");
        }
      }
    } catch (e) {
      console.log(e);
      // setErrors(e.response.data.errors[0].msg);
    }
  };

  const LoginTrainer = async () => {
    try {
      const values = {
        email: "trainer@gmail.com",
        password: "12345",
      };
      const res = await axios.post("/api/login/loginTrainer", values);
      const { token } = res.data;
      dispatch(setUser({ user: token }));
      if (user) {
        if (user.user.rank === 1 || user.user.rank === 0) {
          history.push("/TrainerHomePage");
        } else {
          console.log(user.user);
          history.push("/Trainee");
        }
      }
      history.push("/");
    } catch (e) {
      setErrors(e.response.data.errors[0].msg);
    }
  };

  useEffect(() => {
    if (user && (user.user.rank === 1 || user.user.rank === 0)) {
      history.push("/TrainerHomePage");
    } else if (user && user.user.rank === 2) history.push("/Trainee");
  }, [user, history]);


  const handleChange = () => {
    setisTrainer(!isTrainer);
  };

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => LoginTrainee()}
        >
          Login as a Trainee
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => LoginTrainer()}
        >
          Login as a Trainer
        </Button>
      </Box>
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
                    const res = await axios.post("/api/login/loginTrainee", values);
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
                 
                      name="email"
                      type="email"
                      label="Email"
                    />
                    <br />
                    <MyTextField
                 
                      name="password"
                      type="password"
                      label="Password "
                    />
                    <Checkbox
                      checked={isTrainer}
                      // name="trainer"
                      label="Password "
                      onChange={handleChange}
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
    </>
  );
};

export default Login;
