import React from 'react'
import { Route, Routes as Switch } from 'react-router-dom'

import { PATHS } from './PATHS'
import {
  // RouteWithoutNav,
  RouteWithLandingPageNav,
  RouteWithNavbar,
} from './RouteTypes'

const LoginPage = React.lazy(
  () => import(/* webpackChunckName: "LoginPage" */ '../pages/LoginPage'),
)
const MainPage = React.lazy(() => import(/* webpackChunckName: "MainPage" */ '../pages/MainPage'))
const RegisterPage = React.lazy(
  () => import(/* webpackChunckName: "RegisterPage" */ '../pages/SignupPage'),
)
const ForgetPasswordPage = React.lazy(
  () => import(/* webpackChunckName: "ForgetPasswordPage" */ '../pages/ForgetPasswordPage'),
)
const LoadingPage = React.lazy(
  () => import(/* webpackChunckName: "LoadingPage" */ '../pages/LoadingPage'),
)
const UserProfilePage = React.lazy(
  () => import(/* webpackChunckName: "UserProfilePage" */ '../pages/UserProfilePage'),
)

export const Routes = () => (
  <Switch>
    <Route
      path={PATHS.LOGIN}
      element={<RouteWithLandingPageNav component={LoginPage} title="Log in" />}
    />
    <Route
      path={PATHS.MAIN}
      element={
        <RouteWithNavbar navbarType="marketplace" component={MainPage} title="Marketplace" />
      }
    />
    <Route
      path={PATHS.REGISTER}
      element={<RouteWithLandingPageNav component={RegisterPage} title="Sign Up" />}
    />
    <Route
      path={PATHS.FORGET_PASSWORD}
      element={<RouteWithLandingPageNav component={ForgetPasswordPage} title="Log In" />}
    />
    <Route
      path={PATHS.USER_PROFILE}
      element={<RouteWithLandingPageNav component={UserProfilePage} title="Settings" />}
    />
    <Route
      path="/neigh" // easter egg
      element={<RouteWithLandingPageNav component={LoadingPage} title="neigh??" />}
    />
  </Switch>
)
