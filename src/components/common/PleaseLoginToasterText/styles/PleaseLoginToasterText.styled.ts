import styled from 'styled-components'

export const StyledLoginToasterText = styled.span`
  color: ${(props) => props.theme.palette.text.default};
`

export const LoginLink = styled.span`
  cursor: pointer;
  text-decoration: underline;
  font-weight: 700;
  color: ${(props) => props.theme.palette.secondary};
`
