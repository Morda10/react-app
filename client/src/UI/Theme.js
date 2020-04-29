import { createMuiTheme } from "@material-ui/core/styles";

const mainBlack = "#202020";
// const arcOrange = "#FFBA60";
const mainGrey = "#92969a";

export default createMuiTheme({
  palette: {
    common: {
      black: mainBlack,
      grey: mainGrey,
    },
    primary: {
      main: mainBlack,
    },
    secondary: {
      main: mainGrey,
    },
  },
});
