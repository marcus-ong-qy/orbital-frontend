import styled, { FontType } from 'styled-components'
import { borderedGreyDivCss, fontTypeCss, styledPageCss } from '../../../../styles/index.styled'

export const StyledChatPage = styled.div`
  ${styledPageCss}

  display: flex;
  flex-direction: row;

  padding: 60px;
`

export const ChatsDrawerDiv = styled.div`
  ${borderedGreyDivCss}

  width: 30vw;
  height: 530px;
`

export const ChatsDrawerHeader = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  height: 62px;
  padding-left: 2.5vw;

  font-weight: 700;
  line-height: 62px;

  border-bottom: 1px solid ${(props) => props.theme.palette.common.black};
`

export const ChatInterfaceDiv = styled.div`
  ${borderedGreyDivCss}

  width: 54vw;
  height: 530px;
  margin-left: 4.5vw;
`
