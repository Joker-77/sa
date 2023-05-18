/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
// Components/AppRoute.js

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../context/Auth/index";
import PropTypes from "prop-types";

const AppRoute = ({ component: Component, path, isPrivate, ...rest }) => {
  const userDetails = useAuthState();
  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && !Boolean(userDetails.token) ? (
          <Redirect to={{ pathname: "/login" }} />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};
AppRoute.propTypes = {
  com
};
export default AppRoute;
