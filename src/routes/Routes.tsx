import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

import { PATHS } from './PATHS';
import { RouteWithoutNav, RouteWithLandingPageNav } from './RouteTypes';

const LoginPage = React.lazy(
  () => import(/* webpackChunckName: "LoginPage" */ '../pages/LoginPage')
);
const MainPage = React.lazy(
  () => import(/* webpackChunckName: "MainPage" */ '../pages/MainPage')
);
const RegisterPage = React.lazy(
  () =>
    import(
      /* webpackChunckName: "RegisterPage" */ '../pages/RegisterPage/index'
    )
);
const ForgetPasswordPage = React.lazy(
  () =>
    import(
      /* webpackChunckName: "ForgetPasswordPage" */ '../pages/ForgetPasswordPage'
    )
);

export const Routes = () => (
  <Switch>
    <Route
      path={PATHS.LOGIN}
      element={<RouteWithLandingPageNav component={LoginPage} title="Log in" />}
    />
    <Route
      path={PATHS.MAIN}
      element={<RouteWithoutNav component={MainPage} />}
    />
    <Route
      path={PATHS.REGISTER}
      element={
        <RouteWithLandingPageNav component={RegisterPage} title="Sign Up" />
      }
    />
    <Route
      path={PATHS.FORGET_PASSWORD}
      element={
        <RouteWithLandingPageNav
          component={ForgetPasswordPage}
          title="Log In"
        />
      }
    />
  </Switch>
);
