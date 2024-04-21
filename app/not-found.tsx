'use client';

import { BottomNavBar, NavBar, Image, Text, Button } from '@/components';
import styled from 'styled-components';
import notFoundImage from '../assets/images/404.svg';
import FooterSection from '../sections/FooterSection';
import { useRouter } from 'next/navigation';

export const metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  const router = useRouter();

  return (
    <Main>
      <NavBar />
      <BottomNavBar />
      <NotFoundContainer>
        <Image
          src={notFoundImage}
          alt='404'
          width={300}
          height={300}
        />
        <Text className='header_icon'>404</Text>

        <Text className='header_title'>Oops! Page not found</Text>
        <div className='button'>

          <Button onClick={() => router.back()}>Go back</Button>
        </div>
      </NotFoundContainer>
      <FooterSection />
    </Main>
  );
}

const Main = styled.main``;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .header_icon {
    font-size: 2rem;
    color: #f00;
  }
  .header_title {
    font-size: 2rem;
    color: #f00;
  }
  .button{
    margin-top: 1rem;
  }
`;
