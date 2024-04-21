import { BlogType } from '@/types';
import styled from 'styled-components';
import { Image } from './Image';
import { themes } from '@/utils/theme';
import { FaHeart } from 'react-icons/fa';
import { BiSolidMessageRounded } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

export const BlogCard = (props: BlogType) => {
  const router = useRouter();

  const goToBlog = () => {
    router.push(`/blog/${props.slug}`);
  };
  return (
    <Card onClick={goToBlog}>
      <Image
        src={props.image}
        alt={props.title}
        layout='responsive'
        objectFit='contain'
        width={500}
        height={500}
        blurDataURL={props.image}
        transparent={false}
      />
      <CardDescription>
        <div className='title'>{props.title}</div>
        <div className='description'>{props.preview}</div>
        <div className='statistics'>
          <div className='likes'>
            <FaHeart
              size='1rem'
              color='red'
            />
            <span>{props.likes.length}</span>
          </div>
          <div className='comments'>
            <BiSolidMessageRounded
              size='1rem'
              color='white'
            />
            <span>{props.comments.length}</span>
          </div>
        </div>
      </CardDescription>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 2px solid ${themes.secondary};
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease-in-out;
  cursor: pointer;
  height: 280px;
  width: 100%;
  position: relative;

  img {
    object-fit: cover !important;
    height: 100% !important;
  }
`;

const CardDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 0.3rem;
  padding: 1rem 1rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(90deg, #10131a, #00657e);
  backdrop-filter: blur(3px);
  transition: transform 0.3s ease-in-out;
  border-top: 1px solid #2eb2d3;
  overflow: hidden;

  height: 50%;
  .title {
    font-size: 15px;
    font-weight: 900;
    color: rgba(255, 255, 255, 1);
  }

  .description {
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
  }

  .statistics {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 20px;

    .likes,
    .comments {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
    }
  }
`;
