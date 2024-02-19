import { themes } from '@/utils/theme';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import styled from 'styled-components';
import Link from 'next/link';

const FooterSection = () => {
  return (
    <Footer>
      <div className='footer-content'>
        <div className='hr' />
        <div className='footer-icons'>
          {Linkes.map((link, index) => (
            <div
              className='footer-content__social'
              key={index}
            >
              <Link
                href={link.href}
                target={link.target}
                rel={link.rel}
              >
                {link.icon}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Footer>
  );
};

interface LinksProps {
  href: string;
  target: string;
  rel: string;
  icon: React.ReactNode;
}

const Linkes: LinksProps[] = [
  {
    href: 'https://www.linkedin.com/in/fabrice-ndacyayisenga/',
    target: '_blank',
    rel: 'noreferrer',
    icon: <FaLinkedin />,
  },
  {
    href: 'https://github.com/fab-ryan',
    target: '_blank',
    rel: 'noreferrer',
    icon: <FaGithub />,
  },
  {
    href: 'https://twitter.com/250_fab',
    target: '_blank',
    rel: 'noreferrer',
    icon: <FaTwitter />,
  },
  {
    href: 'mailto:royalfabrice1234@gmail.com',
    target: '_blank',
    rel: 'noreferrer',
    icon: <MdEmail />,
  },
];

export default FooterSection;

const Footer = styled.footer`
  background: ${themes.primary};
  color: ${themes.text};
  padding: 2rem 0;
  text-align: center;

  .footer-content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem 8rem;
    flex-direction: column;

    .hr {
      width: 100%;
      background: ${themes.tertiary};
      height: 1px;
    }
  }

  .footer-content__social {
    font-size: 1rem;
    color: ${themes.text};
    a {
      color: ${themes.text};
    }
  }
  .footer-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;
