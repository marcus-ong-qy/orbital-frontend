import { Input } from 'antd';
import {
  NavbarTitle,
  RightDiv,
  SearchDiv,
  StyledLandingPageNav,
  StyledLogo,
} from './styles/Navbars.styled';

import logo from '../../assets/Neigh-logos_transparent.png';
import { theme } from '../../styles/Theme';
import { NavLinks } from '../NavLinks/styles/NavLinks.styled';
import NavLink from '../NavLinks/NavLink';
import { PATHS } from '../../routes/PATHS';
import { useNavigate } from 'react-router-dom';

const LoadingPageNav = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  const { navTitleFont, navLinkFont } = { ...theme.typography.fontSize };
  const { Search } = Input;

  const onSearch = () => {
    // TODO
  };

  return (
    <StyledLandingPageNav>
      <StyledLogo src={logo} />
      <NavbarTitle fontType={navTitleFont}>{title}</NavbarTitle>
      <SearchDiv>
        <NavLinks fontType={navLinkFont}>
          <NavLink text={'Marketplace'} onClick={() => navigate(PATHS.MAIN)} />
          &nbsp;|&nbsp;
          <NavLink
            text={'Community'}
            onClick={() => navigate(PATHS.COMMUNITY)}
          />
        </NavLinks>
        <Search placeholder="Search" onSearch={onSearch} />
      </SearchDiv>
      <RightDiv>
        <NavLinks fontType={navLinkFont} justify="center">
          <NavLink text={'Log In'} onClick={() => navigate(PATHS.LOGIN)} />
          &nbsp;|&nbsp;
          <NavLink text={'Sign Up'} onClick={() => navigate(PATHS.REGISTER)} />
        </NavLinks>
      </RightDiv>
    </StyledLandingPageNav>
  );
};

export default LoadingPageNav;
