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

// Settings
const UserProfilePage = React.lazy(
  () => import(/* webpackChunckName: "UserProfilePage" */ '../pages/Settings/UserProfilePage'),
)
const UserListingsPage = React.lazy(
  () => import(/* webpackChunckName: "UserListingsPage" */ '../pages/Settings/UserListingsPage'),
)

//Marketplace
const MainPage = React.lazy(
  () => import(/* webpackChunckName: "MainPage" */ '../pages/Marketplace/MainPage'),
)
const ItemPage = React.lazy(
  () => import(/* webpackChunckName: "ItemPage" */ '../pages/Marketplace/ItemPage'),
)
const ChatPage = React.lazy(
  () => import(/* webpackChunckName: "ChatPage" */ '../pages/Marketplace/ChatPage'),
)
const DealPage = React.lazy(
  () => import(/* webpackChunckName: "DealPage" */ '../pages/Marketplace/DealPage'),
)
const UploadListingPage = React.lazy(
  () =>
    import(/* webpackChunckName: "UploadListingPage" */ '../pages/Marketplace/UploadListingPage'),
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
      path="/neigh" // easter egg
      element={<RouteWithLandingPageNav component={LoadingPage} title="neigh??" />}
    />

    {/* Settings */}
    <Route
      path={PATHS.USER_PROFILE}
      element={<RouteWithLandingPageNav component={UserProfilePage} title={TITLE.SETTINGS} />}
    />
    <Route
      path={PATHS.USER_LISTINGS}
      element={<RouteWithLandingPageNav component={UserListingsPage} title={TITLE.SETTINGS} />}
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
    <Route
      path={PATHS.CHAT}
      element={
        <RouteWithNavbar navbarType="marketplace" component={ChatPage} title={TITLE.MARKETPLACE} />
      }
    />
    <Route
      path={PATHS.DEAL_ID}
      element={
        <RouteWithNavbar navbarType="marketplace" component={DealPage} title={TITLE.MARKETPLACE} />
      }
    />
    <Route
      path={PATHS.UPLOAD_LISTING}
      element={
        <RouteWithNavbar
          navbarType="marketplace"
          component={UploadListingPage}
          title={TITLE.MARKETPLACE}
        />
      }
    />
  </Switch>
)
