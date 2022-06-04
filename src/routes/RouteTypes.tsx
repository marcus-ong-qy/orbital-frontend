import React from 'react'
import LandingPageNav from '../components/navigation/LandingPageNav'
import Navbar from '../components/navigation/Navbar'
import { navBarBuffer } from '../components/navigation/styles/Navbars.styled'
import { StyledNavPage, StyledMain } from './styles/Routes.styled'

export const RouteWithoutNav = (routeProps: {
  component: React.LazyExoticComponent<React.ComponentType<any>>
}) => {
  const { component: Component } = routeProps

  return (
    <StyledMain>
      <Component />
    </StyledMain>
  )
}

export const RouteWithLandingPageNav = (routeProps: {
  component: React.LazyExoticComponent<React.ComponentType<any>>
  title: string
}) => {
  const { component: Component, title } = routeProps

  return (
    <StyledNavPage>
      <LandingPageNav title={title} />
      <div style={{ height: navBarBuffer }} />
      <Component />
    </StyledNavPage>
  )
}

export const RouteWithNavbar = (routeProps: {
  component: React.LazyExoticComponent<React.ComponentType<any>>
  title: string
  navbarType: 'marketplace' | 'community'
}) => {
  const { component: Component, title, navbarType } = routeProps

  return (
    <StyledNavPage>
      <Navbar title={title} type={navbarType} />
      <div style={{ height: navBarBuffer }} />
      <Component />
    </StyledNavPage>
  )
}
