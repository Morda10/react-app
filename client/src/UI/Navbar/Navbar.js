/* eslint-disable react/prop-types */
import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@material-ui/core";
import { logout } from "../../redux/reducers/UserReducer";

const Navbar = ({ routing }) => {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const navButtons = routing.map((r) => (
    <Link
      to={r.to}
      style={{ textDecoration: "none", color: "currentColor" }}
      key={r.name}
    >
      <Button color="inherit">{r.name}</Button>
    </Link>
  ));

  return (
    <Box display="flex" justifyContent="center">
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
    </Box>
  );
};

export default Navbar;
