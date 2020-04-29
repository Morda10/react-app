import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    backgroundColor: "#202020",
    marginBottom: "3rem",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
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
      <Button color="inherit">{r.name}</Button>
    </Link>
  ));

  return (
    <div className={classes.root}>
      <AppBar className={classes.toolbar} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
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
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
