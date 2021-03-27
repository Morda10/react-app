import React, { useState, useEffect } from "react";
import { useField } from "formik";
import {
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  FormControl,
} from "@material-ui/core";

const MyTrainerSelect = ({ label, trainers, newTrainer, ...props }) => {
  const [field, meta] = useField(props);
  const [helperText, sethelperText] = useState("Select trainer from the list");
  const error = !newTrainer && meta.touched && meta.error ? true : false;
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
      <FormControl
        error={error}
        style={{ display: "flex", maxWidth: "70%", marginBottom: "1em" }}
      >
        <InputLabel>{label}</InputLabel>
        <Select {...field} {...props} error={error}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {trainerList}
        </Select>
        {newTrainer ? null : (
          <FormHelperText error={error}>{helperText}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default MyTrainerSelect;
