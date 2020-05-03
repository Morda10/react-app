import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

export const MyCalendar = ({ date, today, onChange }) => {
  const twoWeeksFromNow = new Date(moment(today).add(2, "weeks").format());

  return (
    <div>
      <Calendar
        minDate={today}
        maxDate={twoWeeksFromNow}
        calendarType="Hebrew"
        onChange={onChange}
        value={date}
      />
    </div>
  );
};

export default MyCalendar;
