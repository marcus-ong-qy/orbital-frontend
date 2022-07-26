import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'

import { PATHS } from '../../../routes/PATHS'
import formatPrice from '../../../common/formatPrice'
import { ItemListing } from '../../../store/marketplace/types'

import {
  ItemBottomDiv,
  ItemDisplayDiv,
  ItemName,
  ItemPic,
  PriceTag,
  PriceTagSuffix,
} from './styles/ItemDisplay.styled'

import defaultPic from '../../../assets/picture.png'

const ItemDisplay = ({ item }: { item: ItemListing }) => {
  const theme = useTheme()
  const navigate = useNavigate()

  const { h2 } = { ...theme.typography.fontSize }

  const onClick = () => {
    navigate(`${PATHS.ITEM}/${item._id}`)
  }

  return (
    <ItemDisplayDiv id={item._id} onClick={onClick}>
      <ItemPic src={item.imageURL[0] ? item.imageURL[0] : defaultPic} />
      <ItemName fontType={h2}>{item.name}</ItemName>
      <ItemBottomDiv>
        <PriceTag>${formatPrice(item.price)}</PriceTag>
        {item.typeOfTransaction === 'RENT' && <PriceTagSuffix>/day</PriceTagSuffix>}
      </ItemBottomDiv>
    </ItemDisplayDiv>
  )
}

export default ItemDisplay
