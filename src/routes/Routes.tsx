import React from 'react'
import { Route, Routes as Switch } from 'react-router-dom'

import { PATHS } from './PATHS'
import {
  // RouteWithoutNav,
  RouteWithLandingPageNav,
  RouteWithNavbar,
} from './RouteTypes'

// Authentication
const LoginPage = React.lazy(
  () => import(/* webpackChunckName: "LoginPage" */ '../pages/Authentication/LoginPage'),
)
const RegisterPage = React.lazy(
  () => import(/* webpackChunckName: "RegisterPage" */ '../pages/Authentication/SignupPage'),
)
const ForgetPasswordPage = React.lazy(
  () =>
    import(
      /* webpackChunckName: "ForgetPasswordPage" */ '../pages/Authentication/ForgetPasswordPage'
    ),
)
const LoadingPage = React.lazy(
  () => import(/* webpackChunckName: "LoadingPage" */ '../pages/Miscellaneous/LoadingPage'),
)
const UserProfilePage = React.lazy(
  () =>
    import(/* webpackChunckName: "UserProfilePage" */ '../pages/Authentication/UserProfilePage'),
)

//Marketplace
const MainPage = React.lazy(
  () => import(/* webpackChunckName: "MainPage" */ '../pages/Marketplace/MainPage'),
)
const ItemPage = React.lazy(
  () => import(/* webpackChunckName: "ItemPage" */ '../pages/Authentication/ItemPage'),
)

enum TITLE {
  LOGIN = 'Log In',
  SIGNUP = 'Sign Up',
  MARKETPLACE = 'Marketplace',
  SETTINGS = 'Settings',
}

export const Routes = () => (
  <Switch>
    {/* Authentication */}
    <Route
      path={PATHS.LOGIN}
      element={<RouteWithLandingPageNav component={LoginPage} title={TITLE.LOGIN} />}
    />
    <Route
      path={PATHS.REGISTER}
      element={<RouteWithLandingPageNav component={RegisterPage} title={TITLE.SIGNUP} />}
    />
    <Route
      path={PATHS.FORGET_PASSWORD}
      element={<RouteWithLandingPageNav component={ForgetPasswordPage} title={TITLE.LOGIN} />}
    />
    <Route
      path={PATHS.USER_PROFILE}
      element={<RouteWithLandingPageNav component={UserProfilePage} title={TITLE.SETTINGS} />}
    />
    <Route
      path="/neigh" // easter egg
      element={<RouteWithLandingPageNav component={LoadingPage} title="neigh??" />}
    />

    {/* Marketplace */}
    <Route
      path={PATHS.MAIN}
      element={
        <RouteWithNavbar navbarType="marketplace" component={MainPage} title={TITLE.MARKETPLACE} />
      }
    />
    <Route
      path={PATHS.ITEM_ID}
      element={
        <RouteWithNavbar navbarType="marketplace" component={ItemPage} title={TITLE.MARKETPLACE} />
      }
    />
  </Switch>
)
