import { useEffect } from 'react'
import { useTheme } from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getUserListings } from '../../../store/marketplace/actions'

import SettingsPageWrapper from '../SettingsPageWrapper'
import HorizontalListingBar from '../../../components/common/HorizontalListingBar/HorizontalListingBar'

import {
  NoListingsLabel,
  UserListingsDiv,
  UserListingTitle,
} from './styles/UserListingsPage.styled'

const UserListingsPage = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { navTitleFont, h1 } = { ...theme.typography.fontSize }

  const { allUserListings } = useAppSelector((state) => state.marketplace_reducer)

  useEffect(() => {
    dispatch(getUserListings('any'))
  }, [])

  return (
    <SettingsPageWrapper>
      <UserListingTitle fontType={navTitleFont}>User Listings Page</UserListingTitle>
      {allUserListings.length ? (
        <UserListingsDiv>
          {allUserListings.map((listing, index) => {
            return (
              <HorizontalListingBar
                key={index}
                id={listing._id}
                title={listing.name}
                type={listing.typeOfTransaction}
                // available={listing.available}
                available
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
