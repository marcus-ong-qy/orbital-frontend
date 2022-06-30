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
const EditUserProfilePage = React.lazy(
  () =>
    import(/* webpackChunckName: "EditUserProfilePage" */ '../pages/Settings/EditUserProfilePage'),
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
const EditItemPage = React.lazy(
  () => import(/* webpackChunckName: "EditItemPage" */ '../pages/Marketplace/EditItemPage'),
)
const SearchPage = React.lazy(
  () => import(/* webpackChunckName: "SearchPage" */ '../pages/Marketplace/SearchPage'),
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
      element={<RouteWithNavbar component={LoginPage} title={TITLE.LOGIN} />}
    />
    <Route
      path={PATHS.REGISTER}
      element={<RouteWithNavbar component={RegisterPage} title={TITLE.SIGNUP} />}
    />
    <Route
      path={PATHS.FORGET_PASSWORD}
      element={<RouteWithNavbar component={ForgetPasswordPage} title={TITLE.LOGIN} />}
    />
    <Route
      path="/neigh" // easter egg
      element={<RouteWithNavbar component={LoadingPage} title="neigh??" />}
    />

    {/* Settings */}
    <Route
      path={PATHS.USER_PROFILE}
      element={<RouteWithNavbar component={UserProfilePage} title={TITLE.SETTINGS} />}
    />
    <Route
      path={PATHS.EDIT_USER_PROFILE}
      element={<RouteWithNavbar component={EditUserProfilePage} title={TITLE.SETTINGS} />}
    />
    <Route
      path={PATHS.USER_LISTINGS}
      element={<RouteWithNavbar component={UserListingsPage} title={TITLE.SETTINGS} />}
    />

    {/* Marketplace */}
    <Route
      path={PATHS.MAIN}
      element={<RouteWithNavbar component={MainPage} title={TITLE.MARKETPLACE} />}
    />
    <Route
      path={PATHS.ITEM_ID}
      element={<RouteWithNavbar component={ItemPage} title={TITLE.MARKETPLACE} />}
    />
    <Route
      path={PATHS.EDIT_ITEM_ID}
      element={<RouteWithNavbar component={EditItemPage} title={TITLE.MARKETPLACE} />}
    />
    <Route
      path={PATHS.SEARCH_ID}
      element={<RouteWithNavbar component={SearchPage} title={TITLE.MARKETPLACE} />}
    />
    <Route
      path={PATHS.CHAT_ID}
      element={<RouteWithNavbar component={ChatPage} title={TITLE.MARKETPLACE} />}
    />
    <Route
      path={PATHS.DEAL_ID}
      element={<RouteWithNavbar component={DealPage} title={TITLE.MARKETPLACE} />}
    />
    <Route
      path={PATHS.UPLOAD_LISTING}
      element={<RouteWithNavbar component={UploadListingPage} title={TITLE.MARKETPLACE} />}
    />
  </Switch>
)
