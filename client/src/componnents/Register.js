import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Card, CardContent, Button, Grid, Typography } from "@material-ui/core";
import MyTextField from "./Input/Input";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Email not valid")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be 5 characters or longer")
    .required("password is required"),
  repass: Yup.string()
    .min(5, "Password must be 5 characters or longer")
    .required("Enter password again")
    .oneOf([Yup.ref("password"), null], "Password doesnt match"),
});

const useStyles = makeStyles({
  root: {
    marginTop: "2rem",
  },
  title: {
    fontSize: 14,
  },
  button: {
    backgroundColor: "#202020",
    color: "white",
  },
});

const Register = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={10} sm={8} lg={6}>
        <Card className={classes.root}>
          <CardContent>
            <Typography align="center" variant="h3">
              Register
            </Typography>
            <Formik
              initialValues={{
                email: "",
                name: "",
                lastName: "",
                password: "",
                repass: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                try {
                  const res = await axios.post("/api/users/", values);
                  console.log(res);
                  history.push("/");
                } catch (e) {
                  console.log(e);
                }
                actions.resetForm();
              }}
            >
              {(values, isSubmitting) => (
                <Form>
                  <MyTextField
                    key="1"
                    name="name"
                    type="text"
                    label="First Name "
                  />
                  <MyTextField
                    key="2"
                    name="lastName"
                    type="text"
                    label="Last Name "
                  />
                  <br />
                  <MyTextField
                    key="3"
                    name="email"
                    type="email"
                    label="Email "
                  />
                  <br />
                  <MyTextField
                    key="4"
                    name="password"
                    type="password"
                    label="Password "
                  />
                  <br />
                  <MyTextField
                    key="5"
                    name="repass"
                    type="password"
                    label="Renter password "
                  />
                  <br />
                  <Button
                    className={classes.button}
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                  {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Register;
