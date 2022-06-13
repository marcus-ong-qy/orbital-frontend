import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import { TEXTS } from '../../../common/texts'
import { auth, getUserFirebaseProfile } from '../../../firebase'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { theme } from '../../../styles/Theme'

import { defaultUserFirebaseProfile } from '../../../store/authentication/reducer'
import { FirebaseProfile } from '../../../store/authentication/types'
import { getListings } from '../../../store/marketplace/actions'
import { ItemListing } from '../../../store/marketplace/types'

import ItemDisplay from '../../../components/marketplace/ItemDisplay/ItemDisplay'

import {
  CarouselDiv,
  CategoriesDiv,
  CategoriesTitle,
  FeaturedDiv,
  FeaturedTitle,
  GreetingsDiv,
  GreetingsSpan,
  GreetingsUsernameSpan,
  HorseHead,
  ItemsContainer,
  ListingsDiv,
  ListingsTitle,
  StyledMainPage,
} from './styles/MainPage.styled'

import horseHead from '../../../assets/Horse-head-transparent.png'

const MainPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { navTitleFont, h1 } = { ...theme.typography.fontSize }

  const { allListings } = useAppSelector((state) => state.marketplace_reducer)

  const [userFirebaseProfile, setUserFirebaseProfile] = useState<FirebaseProfile>(
    defaultUserFirebaseProfile,
  )
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    dispatch(getListings())
  }, [])

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

  return (
    <StyledMainPage data-testid="MarketplaceMain">
      <GreetingsDiv fontType={navTitleFont}>
        <HorseHead src={horseHead} />
        <GreetingsSpan>
          {`${TEXTS.GREETINGS}, `}
          {isLoggedIn ? (
            <GreetingsUsernameSpan>{userFirebaseProfile.email}</GreetingsUsernameSpan>
          ) : (
            'stranger'
          )}
          !
        </GreetingsSpan>
      </GreetingsDiv>

      <CarouselDiv>
        <h1>Carousel Under Construction</h1>
      </CarouselDiv>

      <FeaturedDiv>
        <FeaturedTitle fontType={h1}>Featured</FeaturedTitle>
        <ItemsContainer
          style={{ height: '658px', width: 'auto', overflowX: 'scroll', overflowY: 'hidden' }}
        >
          {allListings?.map((item, index) => {
            return <ItemDisplay key={index} item={item} />
          })}
        </ItemsContainer>
      </FeaturedDiv>

      <CategoriesDiv>
        <CategoriesTitle fontType={h1}>Categories</CategoriesTitle>
      </CategoriesDiv>

      <ListingsDiv>
        <ListingsTitle fontType={h1}>Listings</ListingsTitle>
        <ItemsContainer>
          {allListings?.map((item, index) => {
            return <ItemDisplay key={index} item={item} />
          })}
        </ItemsContainer>
      </ListingsDiv>
    </StyledMainPage>
  )
}

export default MainPage
