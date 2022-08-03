import { StyledButton } from './styles/Button.styled'

const Button = ({
  text,
  onClick,
  style,
  type,
  color,
  disabled,
}: {
  text: string
  onClick?: React.MouseEventHandler<HTMLElement>
  style?: React.CSSProperties
  type?: 'button' | 'submit' | 'reset'
  color?: 'secondary' | 'primary' | 'danger'
  disabled?: boolean
}) => {
  return (
    <StyledButton
      onClick={onClick}
      style={style}
      htmlType={type ?? 'button'}
      color={color}
      disabled={disabled}
    >
      {text}
    </StyledButton>
  )
}

export default Button
