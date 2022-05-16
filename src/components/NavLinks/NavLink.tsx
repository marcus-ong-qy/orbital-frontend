import { StyledNavLink } from './styles/NavLinks.styled';

const NavLink = ({
  text,
  onClick,
}: {
  text: string;
  onClick: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  return <StyledNavLink onClick={onClick}>{text}</StyledNavLink>;
};

export default NavLink;
