import React from "react";
import { Route, Routes as Switch } from "react-router-dom";

import { PATHS } from "./PATHS";
import { RouteWithoutNav } from "./RouteTypes";

const LoginPage = React.lazy(
  () => import(/* webpackChunckName: "LoginPage" */ "../pages/LoginPage")
);
const MainPage = React.lazy(
  () => import(/* webpackChunckName: "MainPage" */ "../pages/MainPage")
);
const RegisterPage = React.lazy(
  () => import(/* webpackChunckName: "RegisterPage" */ "../pages/RegisterPage")
);
const ForgetPasswordPage = React.lazy(
  () =>
    import(
      /* webpackChunckName: "ForgetPasswordPage" */ "../pages/ForgetPasswordPage"
    )
);

export const Routes = () => (
  <Switch>
    <Route
      path={PATHS.LOGIN}
      element={<RouteWithoutNav component={LoginPage} />}
    />
    <Route
      path={PATHS.MAIN}
      element={<RouteWithoutNav component={MainPage} />}
    />
    <Route
      path={PATHS.REGISTER}
      element={<RouteWithoutNav component={RegisterPage} />}
    />
    <Route
      path={PATHS.FORGET_PASSWORD}
      element={<RouteWithoutNav component={ForgetPasswordPage} />}
    />
  </Switch>
);
