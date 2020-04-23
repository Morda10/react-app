import React, { useEffect, useState } from "react";
import {
  Formik,
  Form,
  // Field,
  // ErrorMessage,
  // withFormik,
  // yupToFormErrors,
} from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import {
  //TextField,
  Button,
  // Checkbox,
  // Radio,
  // FormControlLabel,
  // Select,
  // MenuItem,
} from "@material-ui/core";
import MyTextField from "./Input/Input";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
}));

const Login = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  //take care of cleanup
  useEffect(() => {
    // async on useEffect like this
    const fetchData = async () => {
      const res = await axios.get("/api/users/");
      setUsers(res.data);
    };
    fetchData();
    return () => {
      setUsers([]);
    };
  }, []);

  const userslist = users.map((u) => (
    <div key={u._id}>
      <li>name: {u.name}</li>
      <li>email: {u.email}</li>
    </div>
  ));

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
          try {
            const { email, password } = values;
            const config = {
              headers: {
                "Content-Type": "application/json",
              },
            };
            const res = await axios.post("/api/user", values);
            console.log(res);
            history.push("/");
          } catch (e) {
            console.log(e);
          }
          actions.resetForm();
          //console.log("log submit");
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
              variant="contained"
              fullWidth
              color="primary"
              disabled={isSubmitting}
              type="submit"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      {userslist}
    </div>
  );
};

export default Login;
