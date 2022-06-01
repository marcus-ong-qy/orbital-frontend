import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import { auth, getUserProfile } from '../../firebase'
import { theme } from '../../styles/Theme'
import { PATHS } from '../../routes/PATHS'
import { defaultUserProfile } from '../../store/reducer'
import { ProfileInfo } from '../../store/types'

import NavLink from '../NavLinks/NavLink'
import UsernameHover from '../NavLinks/UsernameHover'

import {
  BodyDiv,
  NavbarTitle,
  RightDiv,
  SearchBar,
  SearchDiv,
  StyledLandingPageNav,
  StyledLogo,
} from './styles/Navbars.styled'
import { NavLinks } from '../NavLinks/styles/NavLinks.styled'

import logo from '../../assets/Neigh-logos_transparent.png'

const LoadingPageNav = ({ title }: { title: string }) => {
  const navigate = useNavigate()
  const { navTitleFont, navLinkFont } = { ...theme.typography.fontSize }

  const [userProfile, setUserProfile] = useState<ProfileInfo>(defaultUserProfile)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && !isLoggedIn) {
        setUserProfile(getUserProfile(user))
        setIsLoggedIn(true)
      } else if (!user) {
        setUserProfile(defaultUserProfile)
        setIsLoggedIn(false)
      }
    })
  })

  const onSearch = () => {
    // TODO
  }

  return (
    <StyledLandingPageNav>
      <StyledLogo src={logo} onClick={() => navigate('/neigh') /* easter egg */} />
      <NavbarTitle fontType={navTitleFont}>{title}</NavbarTitle>
      <BodyDiv>
        <NavLinks fontType={navLinkFont}>
          <NavLink text={'Marketplace'} onClick={() => navigate(PATHS.MAIN)} />
          &nbsp;|&nbsp;
          <NavLink text={'Community'} onClick={() => navigate(PATHS.COMMUNITY)} />
        </NavLinks>
        <SearchDiv>
          <SearchBar placeholder="Search" onSearch={onSearch} />
        </SearchDiv>
      </BodyDiv>
      <RightDiv>
        {isLoggedIn ? (
          <NavLinks fontType={navLinkFont} justify="center">
            <UsernameHover userProfile={userProfile} />
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
