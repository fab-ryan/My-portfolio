import { themes } from '@/utils/theme';
import styled from 'styled-components';
import Link from 'next/link';
import { NavLinks } from '@/utils';

export const BottomNavBar = (): JSX.Element => {
  return (
    <BottomNav>
      <Ul>
        {NavLinks.map((link) => (
          <Li key={link.name}>
            <Link href={link.url}>
              {link.icon && link.icon}
              <span>{link.name}</span>
            </Link>
          </Li>
        ))}
      </Ul>
    </BottomNav>
  );
};

const BottomNav = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${themes.primary};
  padding: 1rem;
  color: ${themes.text};
  box-shadow: 1px 1px 9px 0px rgba(0, 0, 0, 0.26);
  transition: all 0.3s ease-in-out;
  transform: translateY(0);
  z-index: 100;

  @media (min-width: 772px) {
    display: none;
  }
`;

const Ul = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  justify-content: space-around;
`;

const Li = styled.li`
  margin: 0 1rem;

  a {
    color: ${themes.text};
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.8rem;
    svg {
      margin-bottom: 0.5rem;
      font-size: 1.5rem;

      @media (max-width: 414px) {
        opacity: 1;
      }
    }

    span {
      @media (max-width: 414px) {
        display: none;
      }
    }
  }
  a:hover,
  a:active {
    color: ${themes.secondary};
  }
`;
