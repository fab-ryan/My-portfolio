import { themes } from '@/utils/theme';
import styled from 'styled-components';
import Link from 'next/link';
import { Button } from './Button';
import { NavLinks } from '@/utils';

export const NavBar = () => {
  return (
    <Nav>
      <NavBarContainer>
        <LogoContainer>
          <NavBarLogo>
            {/* <Image
              src={logo}
              alt='logo'
              transparent={false}
              layout='cover'
            /> */}
            <h1>F</h1>
          </NavBarLogo>
          <h1>abrice</h1>
        </LogoContainer>
        <Ul>
          {NavLinks.map((link) => (
            <Li key={link.name}>
              <Link href={link.url}>{link.name}</Link>
            </Li>
          ))}
        </Ul>
        <Button>Get Started</Button>
      </NavBarContainer>
    </Nav>
  );
};

const Nav = styled.header`
  background-color: transparent;
  color: #fff;
  padding: 0.7rem;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 1;
  box-shadow: 1px -1px 9px 0px rgba(0, 0, 0, 0.26);
  transition: all 0.3s ease-in-out;
  transform: translateY(0);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background-color: transparent;

  @media (max-width: 414px) {
    padding: 0.2rem;
  }
`;

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 3rem;
  h1 {
    font-size: 1.5rem;
  }
  position: relative;
`;

const Ul = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 772px) {
    display: none;
  }
`;

const Li = styled.li`
  margin: 0 1rem;

  a {
    color: ${themes.text};
    text-decoration: none;
  }
  a:hover,
  a:active {
    color: ${themes.secondary};
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;

  h1 {
    font-size: 24px;
    font-family: var(--font-mono);
    color: ${themes.text};

    @media (max-width: 414px) {
      font-size: 20px;
    }
  }
`;

const NavBarLogo = styled.div`
  display: flex;
  align-items: center;
  height: 50px;

`;
