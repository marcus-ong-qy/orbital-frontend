import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import { auth, getUserFirebaseProfile } from '../../firebase'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { theme } from '../../styles/Theme'
import { PATHS } from '../../routes/PATHS'

import { defaultUserFirebaseProfile } from '../../store/authentication/reducer'
import { FirebaseProfile } from '../../store/authentication/types'
import { setNewListing } from '../../store/marketplace/actions'

import NavLink from './NavLinks/NavLink'
import UsernameHover from './NavLinks/UsernameHover'

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
import { LinkGroupSpan, NavLinks } from './NavLinks/styles/NavLinks.styled'

import horseLogo from '../../assets/Neigh-logos_transparent.png'
import shoppingCartLogo from '../../assets/shopping-cart.png'

const Navbar = ({
  title,
  type, // TODO create a type for community
}: {
  title: string
  type: 'marketplace' | 'community'
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { navTitleFont, navLinkFont } = { ...theme.typography.fontSize }

  const { newListing } = useAppSelector((state) => state.marketplace_reducer)

  const [userFirebaseProfile, setUserFirebaseProfile] = useState<FirebaseProfile>(
    defaultUserFirebaseProfile,
  )
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && !isLoggedIn) {
        setUserFirebaseProfile(getUserFirebaseProfile(user))
        setIsLoggedIn(true)
      } else if (!user && isLoggedIn) {
        setUserFirebaseProfile(defaultUserFirebaseProfile)
        setIsLoggedIn(false)
      }
    })
  })

  const onSearch = () => {
    // TODO
  }

  const sellOnClick = () => {
    navigate(PATHS.UPLOAD_LISTING)
    dispatch(setNewListing({ ...newListing, typeOfTransaction: 'Sell' }))
  }

  const rentOnClick = () => {
    navigate(PATHS.UPLOAD_LISTING)
    dispatch(setNewListing({ ...newListing, typeOfTransaction: 'Rent' }))
  }

  return (
    <StyledLandingPageNav>
      <StyledLogo src={horseLogo} onClick={() => navigate('/neigh') /* easter egg */} />
      <NavbarTitle fontType={navTitleFont} onClick={() => navigate(PATHS.MAIN)}>
        {title}
      </NavbarTitle>
      <BodyDiv width="100%">
        <NavLinks fontType={navLinkFont} justify="space-between">
          <LinkGroupSpan>
            <NavLink text="Community" onClick={() => navigate(PATHS.COMMUNITY)} />
            &nbsp;|&nbsp;
            <NavLink text="Sell" onClick={sellOnClick} />
            &nbsp;|&nbsp;
            <NavLink text="Rent" onClick={rentOnClick} />
          </LinkGroupSpan>
          {isLoggedIn ? (
            <>
              <LinkGroupSpan width="25vw" margin="0 5vw 0 0">
                <NavLink text="Notifications" onClick={() => {}} />
                &nbsp;|&nbsp;
                <NavLink text="Settings" onClick={() => {}} />
                &nbsp;|&nbsp;
                <UsernameHover userFirebaseProfile={userFirebaseProfile} />
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
