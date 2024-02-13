import { ServiceCard, Text } from '@/components';
import { themes } from '@/utils/theme';
import styled from 'styled-components';

 const About = () => {
  return (
    <AboutSection id="about">
      <ABoutSectionLeft>
        <div className='title'>
          <Text>My</Text>
          <Text colored>Services</Text>
        </div>
        <div className='description'>
          <p>
            It seems like you are encountering an issue while downloading the
            iOS 17.2 Simulator in Xcode. There could be various reasons for
            download failures. Here are some steps you can try to troubleshoot
            and resolve the issue:
          </p>
          <p>
            1. Check your internet connection: Ensure that you have a stable
            internet connection and that there are no network issues that could
            be causing the download to fail.
          </p>
        </div>
      </ABoutSectionLeft>
      <ABoutSectionRight>
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </ABoutSectionRight>
    </AboutSection>
  );
};

export default About;

const AboutSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'left right';
  grid-gap: 5rem;
  padding: 0rem 7rem;
  margin-top: 5rem;
  margin-bottom: 5rem;

  @media (max-width: 1138px) {
    padding: 0rem 5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 6fr;
    grid-template-areas: 'left' 'right';
    padding: 0rem 1rem;
  }
`;

const ABoutSectionLeft = styled.div`
  .title {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
  }

  .description {
    margin-top: 3rem;
    p {
      margin-bottom: 1rem;
      color: ${themes.tertiary};
    }

    @media (max-width: 768px) {
      margin-top: 1rem;
    }
  }
`;

const ABoutSectionRight = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 1fr) minmax(300px, 1fr);
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
  padding: 0rem 7rem;
  margin-top: 0rem;

  @media (max-width: 1138px) {
    padding: 0rem 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    padding: 0rem 1rem;
  }
`;
