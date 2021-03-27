import React, { useState, useEffect } from "react";
import { useField } from "formik";
import {
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  FormControl,
} from "@material-ui/core";

const MySelect = ({ label, trainers, ...props }) => {
  const [field, meta] = useField(props);
  const [helperText, sethelperText] = useState("Select trainer from the list");
  const error = meta.touched && meta.error ? true : false;
  const trainerList = trainers.map((t) => (
    <MenuItem key={t._id} value={t._id}>
      {t.name}
    </MenuItem>
  ));
  useEffect(() => {
    if (error) {
      sethelperText(meta.error);
    }
  }, [meta.error, error]);

  return (
    <>
      <FormControl error={error}>
        <InputLabel>{label}</InputLabel>
        <Select {...field} {...props} error={error}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {trainerList}
        </Select>
        <FormHelperText error={error}>{helperText}</FormHelperText>
      </FormControl>
    </>
  );
};

export default MySelect;
