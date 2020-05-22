import React from "react";
import moment from "moment";
import { DatePicker, theme } from "react-trip-date";
import { ThemeProvider } from "styled-components";
import { Grid } from "@material-ui/core";

const handleResponsive = (setNumberOfMonth) => {
  let width = document.querySelector(".tp-calendar").clientWidth;
  if (width > 900) {
    setNumberOfMonth(3);
  } else if (width < 900 && width > 580) {
    setNumberOfMonth(2);
  } else if (width < 580) {
    setNumberOfMonth(1);
  }
};

theme.primary = "#202020";

export const MyCalendar = ({ date, today, onChange }) => {
  const Day = ({ day }) => {
    // const disabledStyle = {
    //   color: "#E0E0E0",
    //   cursor: "not-allowed",
    // };
    const twoWeeksFromNow = new Date(
      moment(today)
        .add(2, "weeks")
        .format()
    );
    const isDisabled = day.isAfter(twoWeeksFromNow);
    return (
      <>
        <p
          style={{
            // fontSize: "1.5rem",
            padding: 5,
          }}
          onClick={() => {
            if (!isDisabled) onChange(day);
            else onChange(today);
          }}
          className={
            isDisabled ? "sc-AxjAm bIhcSh select-mode disabled" : "date"
          }
        >
          {day.format("DD")}
        </p>
      </>
    );
  };

  return (
    <Grid container justify="center">
      <Grid item xs={8} sm={6}>
        <ThemeProvider theme={theme}>
          <DatePicker
            handleChange={onChange}
            selectedDays={[moment(date).format("YYYY-MM-DD")]}
            jalali={false}
            numberOfMonths={1}
            numberOfSelectableDays={1}
            // disabledDays={["2020-06-01"]}
            responsive={handleResponsive}
            disabledBeforToday={true}
            disabled={false}
            dayComponent={Day}
          />
        </ThemeProvider>
      </Grid>
    </Grid>
  );
};

export default MyCalendar;
