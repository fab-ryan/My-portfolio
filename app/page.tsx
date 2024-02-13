'use client';
import styled from 'styled-components';
import { NavBar, BottomNavBar, Text, BlogCard } from '@components/index';
import HomeSection from '@/sections/Home';
import AboutSection from '@/sections/About';
import EducationSkill from '@/sections/EducationSkill';
import { themes } from './utils/theme';
import PortfolioSection from './sections/Portfolio';
import { Swiper, SwiperSlide } from 'swiper/react';
import { myBlogs } from './utils';
import { Pagination } from 'swiper/modules';

export default function Home() {
  return (
    <Main>
      <NavBar />
      <BottomNavBar />
      <HomeSection />
      <AboutSection />
      <ExperienceSection>
        <SingleCardExperience>
          <Text className='counts'>40 +</Text>
          <div className='title'>Projects Completed</div>
        </SingleCardExperience>
        <SingleCardExperience>
          <Text className='counts'>20 +</Text>
          <div className='title'>Experience</div>
        </SingleCardExperience>
      </ExperienceSection>

      <EducationSkill />

      <PortfolioSection />

      <BlogSection>
        <BlogHeader>
          <div className='header-title'>
            <Text
              className='title'
              transformed='capitalize'
            >
              Know More With My
            </Text>
            <Text
              className='title'
              colored
              transformed='capitalize'
            >
              Article
            </Text>
          </div>
          <div className='description'>
            Make sure you are using the latest version of Xcode. If not,
            consider updating Xcode to the latest version available
          </div>
        </BlogHeader>
        <BlogContent>
          <CustomerSwiper
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={3}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {myBlogs.map((blog, index) => (
              <SwiperSlide key={index}>
                <BlogCard {...blog} />
              </SwiperSlide>
            ))}
          </CustomerSwiper>
        </BlogContent>
      </BlogSection>
    </Main>
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

const BlogSection = styled.section`
  padding: 2rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
`;

const BlogHeader = styled.div`
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
  .description {
    color: ${themes.tertiary};
    font-size: 14px;
  }
`;

const BlogContent = styled.div`
  width: 100%;
  padding: 2rem 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    padding: 2rem 2rem;
  }
  margin-bottom: 2rem;
`;

const CustomerSwiper = styled(Swiper)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  overflow: hidden;

  @media (max-width: 768px) {
    .swiper-slide:nth-child(odd) {
      margin-top: 0rem;
    }
  }
  .swiper-slide:nth-child(odd) {
    margin-top: 1.5rem;
  }
  .swiper-slide {
    overflow: hidden;
  }

  .swiper-pagination {
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0rem;
    position: absolute;
    .swiper-pagination-bullet {
      background-color: ${themes.secondary};
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
  }
`;
