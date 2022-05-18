import { StyledButton } from './styles/Button.styled';

const Button = ({
  label,
  onClick,
  style,
}: {
  label: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  style?: React.CSSProperties;
}) => {
  return (
    <StyledButton onClick={onClick} style={style}>
      {label}
    </StyledButton>
  );
};

export default Button;
