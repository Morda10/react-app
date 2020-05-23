import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Card, CardContent, Button, Grid, Typography } from "@material-ui/core";
import MyTextField from "./Input/Input";
import MySelect from "./Input/MySelect";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
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
  trainer: Yup.string().required("Must have someone to train you"),
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
  const [trainers, settrainers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await Axios.get("/api/trainers/");
        if (res.data.length !== 0) {
          settrainers(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Grid container justify="center" style={{ marginTop: "3em" }}>
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
                password: "",
                repass: "",
                trainer: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                try {
                  await axios.post("/api/users/", values);
                  history.push("/");
                  return;
                } catch (e) {
                  console.log(e);
                }
                actions.resetForm();
              }}
            >
              {(values, isSubmitting) => (
                <Form>
                  <MyTextField key="1" name="name" type="text" label="Name " />
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
                  <MySelect
                    name="trainer"
                    as="select"
                    label="Trainer "
                    trainers={trainers}
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
