import React from 'react'
import LandingPageNav from '../components/navigation/LandingPageNav'
import MarketplaceNavbar from '../components/navigation/MarketplaceNavbar'
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

// TODO integrate to one and enum over the types?
export const RouteWithMarketplaceNav = (routeProps: {
  component: React.LazyExoticComponent<React.ComponentType<any>>
  title: string
}) => {
  const { component: Component, title } = routeProps

  return (
    <StyledNavPage>
      <MarketplaceNavbar title={title} />
      <div style={{ height: navBarBuffer }} />
      <Component />
    </StyledNavPage>
  )
}
