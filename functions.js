const moment = require("moment");

const twoWeeksArrayMaker = (today, StartWork, LastWorkout) => {
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
  const dates = [{ date: new Date(today), hours: hoursArr }];
  //   console.log(new Date(today));
  let i;
  for (i = 1; i <= 14; i++) {
    const d = moment.utc(today).add(i, "days").hours(0).format();
    // console.log(new Date(d));
    dates.push({
      date: new Date(d),
      hours: hoursArr,
    });
  }
  //   console.log(dates);
  return dates;
};

module.exports = twoWeeksArrayMaker;
