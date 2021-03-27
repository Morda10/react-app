import React from "react";
import { useField } from "formik";

import { TextField } from "@material-ui/core";

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const error = meta.touched && meta.error ? true : false;
  return (
    <>
      <TextField
        fullWidth
        {...field}
        {...props}
        label={label}
        helperText={error ? meta.error : ""}
        error={error}
        margin="normal"
      />
    </>
  );
};

export default MyTextField;
