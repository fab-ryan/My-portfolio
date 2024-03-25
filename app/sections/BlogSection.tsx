import { Swiper, SwiperSlide } from 'swiper/react';
import {  myBlogs } from '@/utils';
import { Pagination } from 'swiper/modules';
import { Text, BlogCard } from '@/components';

import 'swiper/css';
import 'swiper/css/pagination';

import { themes } from '@/utils/theme';
import styled from 'styled-components';
import {useGetBlogsQuery} from '@/redux'
import {useSelector} from '@/hooks/useActions'

const BlogSections = () => {
  useGetBlogsQuery(null);
  const {loading,data:{data,message,}} = useSelector(state =>state.blogs);
 

  
  return (
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
          Blogging is a great way to share your thoughts and ideas with the world.
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

          {
          loading ? 
          [3,4,5,6].map((_,index) => (
            <SwiperSlide key={index}>
              <SkeletonSchema>
              </SkeletonSchema>
            </SwiperSlide>
          ))
          : data.map((blog, index) => (
            <SwiperSlide key={index}>
              <BlogCard {...blog} />
            </SwiperSlide>
          ))}
          
        </CustomerSwiper>
      </BlogContent>
    </BlogSection>
  );
};

export default BlogSections;

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

const SkeletonSchema = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 2px solid #2eb2d314;
  background-color: #585f6940;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease-in-out;
  cursor: pointer;
  height: 280px;
  position: relative;

`;