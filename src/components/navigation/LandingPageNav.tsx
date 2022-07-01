import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'

import { PATHS } from '../../routes/PATHS'

import NavLink from './NavLinks/NavLink'
import UsernameHover from './NavLinks/UsernameHover'
import SearchBar from './Searchbar/Searchbar'

import {
  BodyDiv,
  NavbarTitle,
  RightDiv,
  SearchDiv,
  StyledLandingPageNav,
  StyledLogo,
} from './styles/Navbars.styled'
import { NavLinks } from './NavLinks/styles/NavLinks.styled'

import logo from '../../assets/Neigh-logos_transparent.png'
import { useAppSelector } from '../../app/hooks'

const LoadingPageNav = ({ title }: { title: string }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { navTitleFont, navLinkFont } = { ...theme.typography.fontSize }
  const { isLoggedIn, userFirebaseProfile } = useAppSelector((state) => state.auth_reducer)

  return (
    <StyledLandingPageNav>
      <StyledLogo src={logo} onClick={() => navigate('/neigh') /* easter egg */} />
      <NavbarTitle fontType={navTitleFont}>{title}</NavbarTitle>
      <BodyDiv>
        <NavLinks fontType={navLinkFont}>
          <NavLink text={'Marketplace'} onClick={() => navigate(PATHS.MAIN)} />
          {/* &nbsp;|&nbsp;
          <NavLink text={'Community'} onClick={() => navigate(PATHS.COMMUNITY)} /> */}
        </NavLinks>
        <SearchDiv>
          <SearchBar />
        </SearchDiv>
      </BodyDiv>
      <RightDiv>
        {isLoggedIn ? (
          <NavLinks fontType={navLinkFont} justify="center">
            <UsernameHover maxWidth="16vw" userFirebaseProfile={userFirebaseProfile} />
          </NavLinks>
        ) : (
          <NavLinks fontType={navLinkFont} justify="center">
            <NavLink text="Log In" onClick={() => navigate(PATHS.LOGIN)} />
            &nbsp;|&nbsp;
            <NavLink text="Sign Up" onClick={() => navigate(PATHS.REGISTER)} />
          </NavLinks>
        )}
      </RightDiv>
    </StyledLandingPageNav>
  )
}

export default LoadingPageNav
