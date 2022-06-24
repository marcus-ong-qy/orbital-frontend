import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../../routes/PATHS'
import formatPrice from '../../../common/formatPrice'
import { theme } from '../../../styles/Theme'
import { ItemListing } from '../../../store/marketplace/types'

import {
  ItemBottomDiv,
  ItemDisplayDiv,
  ItemName,
  ItemPic,
  PriceTag,
  PriceTagSuffix,
} from './styles/ItemDisplay.styled'

import catanSet from '../../../assets/catan-set.jpg'

// export type Item = {
//   id: string
//   title: string
//   price: number
//   type: 'sale' | 'rent'
// }

const ItemDisplay = ({ item }: { item: ItemListing }) => {
  const navigate = useNavigate()

  const { h2 } = { ...theme.typography.fontSize }

  const onClick = () => {
    navigate(`${PATHS.ITEM}/${item._id}`)
  }

  return (
    <ItemDisplayDiv id={item._id} onClick={onClick}>
      <ItemPic src={item.imageURL ?? catanSet} />
      <ItemName fontType={h2}>{item.name}</ItemName>
      <ItemBottomDiv>
        <PriceTag>${formatPrice(item.price)}</PriceTag>
        {item.typeOfTransaction === 'Rent' && <PriceTagSuffix>/day</PriceTagSuffix>}
      </ItemBottomDiv>
    </ItemDisplayDiv>
  )
}

export default ItemDisplay
