import styled from 'styled-components'
import { fontTypeCss } from '../../../styles/index.styled'
import { FontType } from '../../../styles/Theme'

export const ItemDisplayDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 379px;
  width: 210px;
`

export const ItemPic = styled.img`
  width: 210px;
  height: 279px;
`

export const ItemName = styled.div`
  width: 100%;
  height: 41px;
  margin: 4px;

  font-weight: 500;
  font-size: 20px;
  line-height: 20px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ItemBottomDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

export const PriceTag = styled.div`
  font-weight: 800;
  font-size: 26px;
  line-height: 48px;

  color: ${(props) => props.theme.palette.highlight.regular};
`

export const TypeIndicatorDiv = styled.div<{ type: 'sale' | 'rent' }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  font-weight: 800;
  font-size: 26px;
  line-height: 48px;

  width: 92px;
  height: 51px;
  border-radius: 51px;

  color: ${(props) => props.theme.palette.common.white};
  background: ${(props) =>
    props.type === 'sale' ? props.theme.palette.primary : props.theme.palette.secondary};
`
