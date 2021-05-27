import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function AdminRoutes({ component: Component, ...rest }) {
  const user = useSelector((state) => state.user);

  const navigate = (user, props) => {
    if (!user || (user && user.user.rank !== 0)) {
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

AdminRoutes.propTypes = {
  component: PropTypes.any.isRequired,
};
