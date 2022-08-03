import styled from 'styled-components'

export const ChatMessageDiv = styled.div<{ messageType: 'sent' | 'received' }>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.messageType === 'sent' ? 'flex-end' : 'flex-start')};

  width: 100%;
  height: 35px;
  margin-top: 15px;
  padding: 0 32px;
`

export const ChatBubble = styled.div<{ messageType: 'sent' | 'received' }>`
  display: flex;
  align-items: center;

  width: auto;
  height: 100%;
  padding: 0 10px;

  background: ${(props) =>
    props.messageType === 'sent'
      ? props.theme.palette.primary
      : props.theme.palette.common.gray.dark};
  border: 1px solid ${(props) => props.theme.palette.common.gray.light};
  border-radius: 20px;
`
