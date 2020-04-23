import React from "react";
import {
  Formik,
  Form,
  // Field,
  // ErrorMessage,
  // withFormik,
  // yupToFormErrors,
} from "formik";
import * as Yup from "yup";
import {
  //   TextField,
  Card,
  CardContent,
  Button,
  Grid,
  Typography,
  //   Checkbox,
  //   Radio,
  //   FormControlLabel,
  //   Select,
  //   MenuItem,
} from "@material-ui/core";
import MyTextField from "./Input/Input";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Email not valid").required("Email is required"),
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
    minWidth: 200,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Register = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid marginTop container justify="center">
      <Grid item xs={6}>
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
                  await axios.post("/api/users/", values);
                  history.push("/");
                } catch (e) {
                  console.log(e);
                }
                actions.resetForm();
                console.log("registered");
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
                    variant="contained"
                    fullWidth
                    color="primary"
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
