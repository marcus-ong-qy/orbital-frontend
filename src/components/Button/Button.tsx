import { StyledButton } from './styles/Button.styled'

const Button = ({
  text,
  onClick,
  style,
  type,
}: {
  text: string
  onClick?: React.MouseEventHandler<HTMLElement>
  style?: React.CSSProperties
  type?: 'button' | 'submit' | 'reset'
}) => {
  return (
    <StyledButton onClick={onClick} style={style} htmlType={type ?? 'button'}>
      {text}
    </StyledButton>
  )
}

export default Button
