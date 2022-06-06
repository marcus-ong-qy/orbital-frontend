import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import { GREETINGS } from '../../common/texts'
import { auth, getUserFirebaseProfile } from '../../firebase'
import { theme } from '../../styles/Theme'
import { PATHS } from '../../routes/PATHS'

import { logout } from '../../store/authentication/actions'
import { defaultUserFirebaseProfile } from '../../store/authentication/reducer'
import { FirebaseProfile } from '../../store/authentication/types'

import ItemDisplay from '../../components/ItemDisplay/ItemDisplay'

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

import horseHead from '../../assets/Horse-head-transparent.png'

const demoItems: {
  title: string
  price: number
  type: 'sale' | 'rent'
}[] = [
  {
    title: 'CATAN - Trade Build Settle [Brand New] [Limited Edition] [blablabla]',
    price: 26.46,
    type: 'sale',
  },
  {
    title: 'CATAN - Trade Build Settle',
    price: 264.6,
    type: 'rent',
  },
  {
    title: 'CATAN',
    price: 2646,
    type: 'sale',
  },
  {
    title: 'CAT',
    price: 2.646,
    type: 'rent',
  },
  {
    title: 'C',
    price: 0.2646,
    type: 'sale',
  },
]

const MainPage = () => {
  const navigate = useNavigate()

  const { navTitleFont, h1 } = { ...theme.typography.fontSize }

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

  const loginOnClick = () => {
    navigate(PATHS.LOGIN)
  }

  const signOutOnClick = () => {
    logout()
    navigate(PATHS.LOGIN)
  }

  return (
    <StyledMainPage data-testid="MarketplaceMain">
      <GreetingsDiv fontType={navTitleFont}>
        <HorseHead src={horseHead} />
        <GreetingsSpan>
          {`${GREETINGS}, `}
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
        <ItemsContainer>
          {demoItems.map((item) => {
            return <ItemDisplay title={item.title} price={item.price} type={item.type} />
          })}
        </ItemsContainer>
      </FeaturedDiv>

      <CategoriesDiv>
        <CategoriesTitle fontType={h1}>Categories</CategoriesTitle>
      </CategoriesDiv>

      <ListingsDiv>
        <ListingsTitle fontType={h1}>Listings</ListingsTitle>
      </ListingsDiv>
    </StyledMainPage>
  )
}

export default MainPage
