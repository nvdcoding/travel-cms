import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { getToken } from "../utils/storage/index";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const hasToken = getToken();
  return (
    <Route
      {...rest}
      render={(props) =>
        hasToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/dang-nhap",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
};

export default PrivateRoute;
