import { useState, useEffect } from 'react'

import { theme } from '../../../styles/Theme'

import {
  UserListingDiv,
  ListingInfoDiv,
  ListingTitle,
  ListingStatusDiv,
  StatusLabel,
  PriceTag,
  ItemPic,
} from './styles/UserListing.styled'

import catanSet from '../../../assets/catan-set.jpg'

type Props = {
  title: string
  type: 'Sell' | 'Rent'
  available: boolean
  price: number
  pictureURL: string
}

const UserListing = (props: Props) => {
  const { title, type, available, price, pictureURL } = { ...props }
  const { h2, p } = { ...theme.typography.fontSize }

  const [statusText, setStatusText] = useState('')

  useEffect(() => {
    if (type === 'Sell') {
      setStatusText(available ? 'For Sale' : 'Sold')
    } else {
      setStatusText(available ? 'For Rent' : 'Rented Out')
    }
  }, [])

  return (
    <UserListingDiv>
      <ListingInfoDiv>
        <ListingTitle fontType={h2}>{title}</ListingTitle>
        <ListingStatusDiv>
          <StatusLabel type={type} available={available}>
            {statusText}
          </StatusLabel>
          <PriceTag>
            for ${price.toFixed(2)}
            {type === 'Rent' && '/day'}
          </PriceTag>
        </ListingStatusDiv>
      </ListingInfoDiv>
      <ItemPic src={catanSet} />
    </UserListingDiv>
  )
}

export default UserListing
