import { useState, useEffect, Key } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { theme } from '../../../styles/Theme'
import { auth, getUserFirebaseProfile } from '../../../firebase'
import { defaultUserFirebaseProfile } from '../../../store/authentication/reducer'
import { FirebaseProfile } from '../../../store/authentication/types'

import SettingsPageWrapper from '../SettingsPageWrapper'
import UserListing from '../../../components/settings/UserListing/UserListing'

import { UserListingsDiv, UserListingTitle } from './styles/UserListingsPage.styled'

type Listing = {
  title: string
  type: string
  available: boolean
  price: number
  pictureURL: string
}

const sampleListings: Listing[] = [
  {
    title: 'Catan1',
    type: 'Sell',
    available: false,
    price: 26.46,
    pictureURL: '',
  },
  {
    title: 'CatanCatan',
    type: 'Sell',
    available: true,
    price: 26.46,
    pictureURL: '',
  },
  {
    title: 'CatanCatanCatan',
    type: 'Rent',
    available: false,
    price: 2.646,
    pictureURL: '',
  },
  {
    title: 'CatanCatanCatanCatan',
    type: 'Rent',
    available: true,
    price: 2.646,
    pictureURL: '',
  },
]

const UserListingsPage = () => {
  const { navTitleFont } = { ...theme.typography.fontSize }
  const [userFirebaseProfile, setUserFirebaseProfile] = useState<FirebaseProfile>(
    defaultUserFirebaseProfile,
  )

  // TODO show loading page
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && userFirebaseProfile === defaultUserFirebaseProfile)
        setUserFirebaseProfile(getUserFirebaseProfile(user))
    })
  })

  return (
    <SettingsPageWrapper>
      <UserListingTitle fontType={navTitleFont}>User Listings Page</UserListingTitle>
      <UserListingsDiv>
        {sampleListings.map((listing, index) => {
          return (
            <UserListing
              key={index}
              title={listing.title}
              type={listing.type as 'Sell' | 'Rent'}
              available={listing.available}
              price={listing.price}
              pictureURL={listing.pictureURL}
            />
          )
        })}
      </UserListingsDiv>
    </SettingsPageWrapper>
  )
}

export default UserListingsPage
