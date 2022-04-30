import React from "react";
import { Route, Routes as Switch } from "react-router-dom";

import { PATHS } from "./PATHS";
import { RouteWithoutNav } from "./RouteTypes";

const LoginPage = React.lazy(
  () => import(/* webpackChunckName: "LoginPage" */ "../pages/LoginPage")
);

export const Routes = () => (
  <Switch>
    <Route
      path={PATHS.LOGIN}
      element={<RouteWithoutNav component={LoginPage} />}
    />
  </Switch>
);
