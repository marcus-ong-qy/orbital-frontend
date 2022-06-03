import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import { auth, getUserProfile } from '../../firebase'
import { theme } from '../../styles/Theme'
import { PATHS } from '../../routes/PATHS'
import { defaultUserProfile } from '../../store/reducer'
import { ProfileInfo } from '../../store/types'
import NavLink from '../NavLinks/NavLink'

import {
  BodyDiv,
  NavbarTitle,
  SearchBar,
  SearchDiv,
  ShoppingCart,
  ShoppingCartDiv,
  StyledLandingPageNav,
  StyledLogo,
} from './styles/Navbars.styled'
import { LinkGroupSpan, NavLinks } from '../NavLinks/styles/NavLinks.styled'

import horseLogo from '../../assets/Neigh-logos_transparent.png'
import shoppingCartLogo from '../../assets/shopping-cart.png'
import UsernameHover from '../NavLinks/UsernameHover'

const Navbar = ({
  title,
  type, // TODO create a type for community
}: {
  title: string
  type: 'marketplace' | 'community'
}) => {
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
      <StyledLogo src={horseLogo} onClick={() => navigate('/neigh') /* easter egg */} />
      <NavbarTitle fontType={navTitleFont}>{title}</NavbarTitle>
      <BodyDiv width="100%">
        <NavLinks fontType={navLinkFont} justify="space-between">
          <LinkGroupSpan>
            <NavLink text="Community" onClick={() => navigate(PATHS.COMMUNITY)} />
            &nbsp;|&nbsp;
            <NavLink text="Trade" onClick={() => {}} />
            &nbsp;|&nbsp;
            <NavLink text="Rent" onClick={() => {}} />
          </LinkGroupSpan>
          {isLoggedIn ? (
            <>
              <LinkGroupSpan width="25vw" margin="0 5vw 0 0">
                <NavLink text="Notifications" onClick={() => {}} />
                &nbsp;|&nbsp;
                <NavLink text="Settings" onClick={() => {}} />
                &nbsp;|&nbsp;
                <UsernameHover userProfile={userProfile} />
              </LinkGroupSpan>
            </>
          ) : (
            <LinkGroupSpan width="25vw">
              <NavLink text="Log In" onClick={() => navigate(PATHS.LOGIN)} />
              &nbsp;|&nbsp;
              <NavLink text="Sign Up" onClick={() => navigate(PATHS.REGISTER)} />
            </LinkGroupSpan>
          )}
        </NavLinks>
        <SearchDiv>
          <SearchBar placeholder="Search" onSearch={onSearch} />
          <ShoppingCartDiv>
            <ShoppingCart src={shoppingCartLogo} />
          </ShoppingCartDiv>
        </SearchDiv>
      </BodyDiv>
    </StyledLandingPageNav>
  )
}

export default Navbar
