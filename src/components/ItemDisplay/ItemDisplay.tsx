import { theme } from '../../styles/Theme'
import {
  ItemBottomDiv,
  ItemDisplayDiv,
  ItemName,
  ItemPic,
  PriceTag,
  TypeIndicatorDiv,
} from './styles/ItemDisplay.styled'

import catanSet from '../../assets/catan-set.jpg'

type Props = {
  title: string
  price: number

  type: 'sale' | 'rent'
}

const TypeIndicator = ({ type }: { type: 'sale' | 'rent' }) => {
  const text = type.charAt(0).toUpperCase() + type.slice(1)

  return <TypeIndicatorDiv type={type}>{text}</TypeIndicatorDiv>
}

const ItemDisplay = (props: Props) => {
  const { h1 } = { ...theme.typography.fontSize }
  return (
    <ItemDisplayDiv>
      <ItemPic src={catanSet} />
      <ItemName>{props.title}</ItemName>
      <ItemBottomDiv>
        <PriceTag>{`$${props.price.toFixed(2)}`}</PriceTag>
        <TypeIndicator type={props.type} />
      </ItemBottomDiv>
    </ItemDisplayDiv>
  )
}

export default ItemDisplay
