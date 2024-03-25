import { themes } from '@/utils/theme';
import styled from 'styled-components';
import profile from '@/assets/images/profile.jpeg';
import Image from 'next/image';
import { Text, Button } from '@/components';
import { handleDownloadResume } from '@/utils';

const Home = (): JSX.Element => {
  return (
    <HomeSectionContainer id='home'>
      <HomeSectionContent>
        <HeaderTitle>
          <Text className='developer'>
            i am <Text colored>developer </Text>{' '}
          </Text>

          <Text>ndacyayisenga fabrice </Text>
        </HeaderTitle>
        <HeaderDescription>
          <p>
            I am a full-stack developer with a passion for creating beautiful
            and functional user experiences.
          </p>
          <p>
            I specialize in building responsive websites, web applications, and
            e-commerce platforms.
          </p>
        </HeaderDescription>
        <Button onClick={() => handleDownloadResume()}>Hire Me </Button>
      </HomeSectionContent>
      <HomeImageContent>
        <ProfileImage
          src={profile}
          height={900}
          width={900}
          alt='developer'
          objectFit='cover'
          layout='responsive'
          placeholder='blur'
        />
      </HomeImageContent>
    </HomeSectionContainer>
  );
};

export default Home;

const HomeSectionContainer = styled.section`
  display: grid;
  grid-template-columns: minmax(300px, 2fr) 1fr;
  gap: 1rem;
  background: linear-gradient(to left, #0e202c, #11141a);
  color: #fff;
  letter-spacing: 0.1rem;
  padding: 0rem 7rem;
  h1 {
    margin: 0;
  }
  @media (max-width: 767px) {
    font-size: 1.5rem;
    grid-template-columns: 1fr;
    padding: 0rem 1rem;
  }

  margin-bottom: 1rem;
`;
const HomeSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 4rem 0rem;
  order: 1;

  button {
    width: 150px;
    align-self: center;
    margin-top: 2rem;
  }
  @media (max-width: 414px) {
    font-size: 1.5rem;
  }

  @media (max-width: 767px) {
    padding: 2rem 0rem;
    order: 2;
  }
`;

const HomeImageContent = styled.div`
  height: 100%;
  width: 100%;
  background-color: #fff;
  order: 2;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 767px) {
    order: 1;
  }
`;
const ProfileImage = styled(Image)`
  width: 100%;
  height: 100% !important;
  object-fit: cover;
  @media (max-width: 414px) {
    font-size: 1.5rem;
  }
`;
const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem 0rem;
  @media (max-width: 414px) {
    font-size: 1.5rem;
    padding: 0.2rem 0rem;
  }

  .developer {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1rem;
  }
`;

const HeaderDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem 0rem;
  color: ${themes.tertiary};
  font-size: 1rem;
  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
  @media (max-width: 414px) {
    font-size: 1rem;
  }
`;
