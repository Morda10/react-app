import axios from "axios";
import moment from "moment";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const isProduction = () => process.env.NODE_ENV === "production";

export const twoWeeksArrayMaker = (today, StartWork, LastWorkout) => {
  const hour_range = (start, finish) => {
    const suffix = ":00";
    const res = [start.toString().concat(suffix)];
    let s = start;
    while (s !== finish) {
      s = (s + 1) % 24;
      res.push((s % 24).toString().concat(suffix));
    }

    return res;
  };

  const hoursArr = hour_range(StartWork, LastWorkout);
  const dates = [{ date: today, hours: hoursArr }];
  let i;
  for (i = 1; i <= 14; i++) {
    dates.push({
      date: new Date(moment(today).add(i, "day").format("MM-DD-YYYY")),
      hours: hoursArr,
    });
  }
  return dates;
};
