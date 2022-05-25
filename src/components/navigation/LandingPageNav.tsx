import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';

import { theme } from '../../styles/Theme';
import NavLink from '../NavLinks/NavLink';
import { PATHS } from '../../routes/PATHS';

import {
  NavbarTitle,
  RightDiv,
  SearchDiv,
  StyledLandingPageNav,
  StyledLogo,
} from './styles/Navbars.styled';
import { NavLinks } from '../NavLinks/styles/NavLinks.styled';

import logo from '../../assets/Neigh-logos_transparent.png';

const LoadingPageNav = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  const { navTitleFont, navLinkFont } = { ...theme.typography.fontSize };
  const { Search } = Input;

  const onSearch = () => {
    // TODO
  };

  return (
    <StyledLandingPageNav>
      {/* easter egg */}
      <StyledLogo src={logo} onClick={() => navigate('/neigh')} />
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
