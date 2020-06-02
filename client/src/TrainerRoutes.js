import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function TrainerRoutes({ component: Component, ...rest }) {
  const user = useSelector((state) => state.user);

  const navigate = (user, props) => {
    if (user) {
      if (user.user.rank !== 0 && user.user.rank !== 1) {
        return (
          <Redirect
            to={{
              pathname: "/Login",
              state: {
                lastPath: window.location.pathname,
              },
            }}
          />
        );
      }
    } else if (!user) {
      return (
        <Redirect
          to={{
            pathname: "/Login",
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

TrainerRoutes.propTypes = {
  component: PropTypes.any.isRequired,
};
