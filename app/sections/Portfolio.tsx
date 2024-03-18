import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Categories, myProjects } from '../utils';

import { Text, PortfolioCard } from '@/components';

import 'swiper/css';
import 'swiper/css/pagination';
import { useState } from 'react';
import styled from 'styled-components';
import { themes } from '@/utils/theme';
import { useGetCategoriesQuery } from '@/redux';
import { useSelector } from '@/hooks/useActions';

type ActiveCategory = {
  name: string;
  id: string;
};
const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>({
    name: 'All',
    id: '0',
  });
  useGetCategoriesQuery({ status: true });
  const {
    loading,
    data: { data },
  } = useSelector((state) => state.categories);

  const handleProjectCategory = (category: string) => {
    if (category === 'All') {
      return myProjects;
    }
    return myProjects.filter((project) => project.category === category);
  };

  return (
    <PortfolioSection>
      <PortfolioHeader>
        <div className='header-title'>
          <Text
            className='title'
            transformed='capitalize'
          >
            My
          </Text>
          <Text
            className='title'
            colored
            transformed='capitalize'
          >
            Latest
          </Text>
          <Text
            className='title'
            transformed='capitalize'
          >
            Projects
          </Text>
        </div>
        <div className='description'>
          Make sure you are using the latest version of Xcode. If not, consider
          updating Xcode to the latest version available
        </div>
      </PortfolioHeader>
      <PortfolioCategories>
        <CategoryButton
          role='button'
          tabIndex={0}
          onClick={() =>
            setActiveCategory({
              name: 'All',
              id: '0',
            })
          }
          active={activeCategory.name === 'All' ? 'true' : 'false'}
        >
          All
        </CategoryButton>
        {data.map((category) => (
          <CategoryButton
            key={category._id}
            role='button'
            tabIndex={0}
            onClick={() =>
              setActiveCategory({
                name: category.name,
                id: category._id,
              })
            }
            active={activeCategory.name === category.name ? 'true' : 'false'}
          >
            {category.name}
          </CategoryButton>
        ))}
      </PortfolioCategories>

      <PortfolioContent>
        {myProjects.length > 0 && (
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
            effect='fade'
          >
            {handleProjectCategory(activeCategory.name).map((project) => (
              <SwiperSlide key={project.id}>
                <PortfolioCard {...project} />
              </SwiperSlide>
            ))}
          </CustomerSwiper>
        )}
      </PortfolioContent>
    </PortfolioSection>
  );
};

export default Portfolio;

const PortfolioSection = styled.section`
  padding: 2rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(to left, #0e202c, #11141a);
`;

const PortfolioHeader = styled.div`
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

const PortfolioCategories = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 2rem 0rem;
`;

const CategoryButton = styled.div<{ active: string }>`
  padding: 0.3rem 1rem;
  border-radius: 15px;
  border: 1px solid ${themes.secondary};
  color: ${(props) =>
    props.active.toString() === 'true' ? themes.text : themes.text};

  &:hover {
    cursor: pointer;
  }
  background-color: ${(props) =>
    props.active === 'true' ? themes.secondary : 'transparent'};
`;

const PortfolioContent = styled.div`
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
  .swiper-slide:nth-child(even) {
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
