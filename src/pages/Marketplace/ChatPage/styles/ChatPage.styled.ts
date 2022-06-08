import styled from 'styled-components'
import { borderedGreyDivCss, styledPageCss } from '../../../../styles/index.styled'

export const StyledChatPage = styled.div`
  ${styledPageCss}

  display: flex;
  flex-direction: row;

  padding: 60px;
`

export const ChatsDrawerDiv = styled.div`
  ${borderedGreyDivCss}

  width: 30vw;
  height: 66vw;
`

export const ChatsDrawerHeader = styled.div`
  width: 100%;
  height: 62px;
`

export const ChatInterfaceDiv = styled.div`
  ${borderedGreyDivCss}

  width: 54vw;
  height: 66vw;
  margin-left: 4.5vw;
`
