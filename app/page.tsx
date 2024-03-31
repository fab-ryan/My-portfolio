'use client';
import styled from 'styled-components';
import { NavBar, BottomNavBar, Text, BlogCard } from './components/index';
import HomeSection from '@/sections/Home';
import AboutSection from '@/sections/About';
import EducationSkill from '@/sections/EducationSkill';
import { themes } from './utils/theme';
import PortfolioSection from './sections/Portfolio';
import BlogSections from './sections/BlogSection';
import ContactForm from './sections/ContactForm';
import { BsTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FaMapMarker } from 'react-icons/fa';
import FooterSection from './sections/FooterSection';
import { Suspense } from 'react';
import { LoadingIcon } from './components/index';

export default function Page() {
  return (
    <Suspense fallback={<LoadingIcon />}>
      <Main>
        <NavBar />
        <BottomNavBar />
        <HomeSection />
        <AboutSection />
        <ExperienceSection>
          <SingleCardExperience>
            <Text className='counts'> 10 +</Text>
            <div className='title'>Projects Completed</div>
          </SingleCardExperience>
          <SingleCardExperience>
            <Text className='counts'>4 +</Text>
            <div className='title'>Experience</div>
          </SingleCardExperience>
        </ExperienceSection>

        <EducationSkill />

        <PortfolioSection />

        <BlogSections />

        <ContactSection>
          <ContactHeader>
            <div className='header-title'>
              <Text className='title'>Contact</Text>
              <Text
                className='title'
                colored
              >
                Me{' '}
              </Text>
            </div>
          </ContactHeader>
          <ContactContent>
            <Address>
              <div className='title'>Address</div>
              <address className='addreesses'>
                In country of thousands hills and Great Rift Valley called
                RWANDA, there live the blind texts. Kigali, Kicukiro
                <div className='sub'>
                  <BsTelephoneFill />
                  <a href='tel:+250784647287'>+250 784 647 287</a>
                </div>
                <div className='sub'>
                  <MdEmail />
                  <a href='mailto:royalfabrice1234@gmail.com'>
                    royalfabrice1234@gmail.com
                  </a>
                  <a href='mailto:ryan.fab@outlook.com'>ryan.fab@outlook.com</a>
                </div>
                <div className='sub'>
                  <FaMapMarker />
                  Kigali, Rwanda Kicukiro
                </div>
              </address>
            </Address>
            <FormContainer>
              <ContactForm />
            </FormContainer>
          </ContactContent>
        </ContactSection>

        <FooterSection />
      </Main>
    </Suspense>
  );
}

const Main = styled.main``;

const ExperienceSection = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2rem 0rem;
  background: linear-gradient(90deg, #0e202c, #11141a);
`;
const SingleCardExperience = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  .counts {
    color: ${themes.primary};
    font-size: 3rem;
    font-weight: 900;
  }
  .title {
    color: ${themes.text};
    font-size: 14px;
  }
`;

const ContactSection = styled.section`
  padding: 2rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(to left, #0e202c, #11141a);
  margin-bottom: 2rem;
`;

const ContactHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  .header-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    .title {
      font-size: 2rem;
      font-weight: 900;
      color: ${themes.primary};
    }
  }
`;

const ContactContent = styled.div`
  width: 100%;
  padding: 2rem 8rem;

  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  grid-gap: 1rem;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 2rem 2rem;
    grid-template-columns: 1fr;
    form {
      margin-top: 2rem;
    }
  }
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  color: ${themes.text};
  gap: 1rem;
  .title {
    color: ${themes.text};
    font-size: 1.5rem;
  }

  .addreesses {
    font-size: 1rem;
    color: ${themes.tertiary};
    .sub {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1rem;
      color: ${themes.tertiary};
      margin-top: 1rem;

      a {
        color: ${themes.tertiary};
      }
    }
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
