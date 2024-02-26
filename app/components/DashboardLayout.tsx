'use client';
import styled from 'styled-components';
import { FaHome } from 'react-icons/fa';
import { themes, SideBarLinks, NavLinks } from '@/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DashboardProps {
  children: React.ReactNode;
}

function DashboardLayouts({ children }: DashboardProps) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Wrapper>
      <SideBarContainer>
        <SideBarContent>
          <Title>Fabrice</Title>

          <NavBar>
            {SideBarLinks.map((item, index) => (
              <NavItem
                key={index}
                className={item.url === pathname ? 'active' : ''}
                onClick={() => {
                  router.push(item.url);
                }}
              >
                {item.icon}
                {item.name}
              </NavItem>
            ))}
          </NavBar>
        </SideBarContent>
      </SideBarContainer>
      <Containers>
        <NavBarContent>
          {NavLinks.map((item, index) => (
            <NavItemTop
              key={index}
              className={item.url === pathname ? 'active' : ''}
            >
              {item.name}
            </NavItemTop>
          ))}
        </NavBarContent>
        {children}
      </Containers>
    </Wrapper>
  );
}
export { DashboardLayouts };

const Wrapper = styled.div`
  background: rgb(16, 19, 26);
  background: linear-gradient(to right, #0e202c, #11141a);
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr;
  grid-gap: 20px;
`;

const Containers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: ${themes.text};
`;

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-right: 20px;
  width: 200px;
  height: 100vh;
  position: relative;
`;
const SideBarContent = styled.div`
  background-color: rgb(255 255 255 / 9%);
  border: 1px solid rgb(255 255 255 / 41%);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  height: 100%;
  margin-top: 25px;
  margin-bottom: 25px;
  margin-left: 25px;
`;

const NavBar = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 50px;
  gap: 30px;
  color: ${themes.text};
`;

const NavItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  cursor: pointer;
  gap: 10px;
  width: 100%;
  border: 1px solid transparent;
  padding: 7px 13px;
  &:hover {
    color: ${themes.secondary};
    background: linear-gradient(to left, #0e202c, #11141a);
    border-radius: 5px;
    border: 0.1px solid ${themes.tertiary};
    transition: 0.3s ease;
  }
  &.active {
    color: ${themes.secondary};
    background: linear-gradient(to left, #0e202c, #11141a);
    border-radius: 5px;
    border: 0.1px solid ${themes.tertiary};
  }
`;

const NavBarContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 50px;
  gap: 30px;
  color: ${themes.text};
  background-color: rgb(255 255 255 / 9%);
  border: 1px solid rgb(255 255 255 / 41%);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  margin-top: 25px;
  height: fit-content;
  width: 90%;
`;
const NavItemTop = styled.div`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  gap: 10px;
  width: 100%;
  border: 1px solid transparent;
  padding: 7px 13px;
  &:hover {
    color: ${themes.secondary};
    border-radius: 5px;
    transition: 0.3s ease;
  }
`;
