import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function PrivateRoute({ component: Component, ...rest }) {
  const user = useSelector((state) => state.user);

  const navigate = (user, props) => {
    if (!user || (user && user.user.rank !== 2)) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: {
              lastPath: window.location.pathname,
            },
          }}
        />
      );
    }

    return <Component {...props} />;
  };

  return <Route {...rest} render={(props) => navigate(user, props)} />;
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
};
