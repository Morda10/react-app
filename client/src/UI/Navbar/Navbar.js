import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  // title: {
  //   flexGrow: 1,
  // },
  // appbar: {
  //   zIndex: theme.zIndex.modal + 1,
  // },
}));

const Navbar = (props) => {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const classes = useStyles();
  const rou = props.routing;
  const navButtons = rou.map((r) => (
    <Link
      to={r.to}
      style={{ textDecoration: "none", color: "currentColor" }}
      key={r.name}
    >
      <Button className={classes.buttons} color="inherit">
        {r.name}
      </Button>
    </Link>
  ));

  return (
    <Box className={classes.root} display="flex" justifyContent="center">
      {/* <AppBar position="fixed" className={classes.appbar}>
        <Toolbar disableGutters>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
      {navButtons}
      {user && (
        <Button
          onClick={() => {
            dispatch(logout());
            window.location.href = "/Login";
          }}
          style={{ textDecoration: "none", color: "currentColor" }}
          color="inherit"
        >
          logout
        </Button>
      )}
      {/* </Toolbar>
      </AppBar> */}
    </Box>
  );
};

export default Navbar;
