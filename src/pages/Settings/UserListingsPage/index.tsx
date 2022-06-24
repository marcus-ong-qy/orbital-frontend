import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { theme } from '../../../styles/Theme'
import { auth, getUserFirebaseProfile } from '../../../firebase'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'

import { defaultUserFirebaseProfile } from '../../../store/authentication/reducer'
import { FirebaseProfile } from '../../../store/authentication/types'
import { getUserListings } from '../../../store/marketplace/actions'

import SettingsPageWrapper from '../SettingsPageWrapper'
import HorizontalListingBar from '../../../components/common/HorizontalListingBar/HorizontalListingBar'

import {
  NoListingsLabel,
  UserListingsDiv,
  UserListingTitle,
} from './styles/UserListingsPage.styled'

const UserListingsPage = () => {
  const dispatch = useAppDispatch()
  const { navTitleFont, h1 } = { ...theme.typography.fontSize }
  const [userFirebaseProfile, setUserFirebaseProfile] = useState<FirebaseProfile>(
    defaultUserFirebaseProfile,
  )

  const { allUserListings } = useAppSelector((state) => state.marketplace_reducer)

  // TODO show loading page
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && userFirebaseProfile === defaultUserFirebaseProfile)
        setUserFirebaseProfile(getUserFirebaseProfile(user))
    })
  })

  useEffect(() => {
    dispatch(getUserListings())
  }, [userFirebaseProfile, dispatch])

  return (
    <SettingsPageWrapper>
      <UserListingTitle fontType={navTitleFont}>User Listings Page</UserListingTitle>
      {allUserListings.length ? (
        <UserListingsDiv>
          {allUserListings.map((listing, index) => {
            return (
              <HorizontalListingBar
                key={index}
                title={listing.name}
                type={listing.typeOfTransaction}
                available={listing.available}
                price={listing.price}
                pictureURL={listing.imageURL}
              />
            )
          })}
        </UserListingsDiv>
      ) : (
        <NoListingsLabel fontType={h1}>No Listings Found</NoListingsLabel>
      )}
    </SettingsPageWrapper>
  )
}

export default UserListingsPage
