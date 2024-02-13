import { ProjectType } from '@/utils';
import styled from 'styled-components';
import { Image } from './Image';
import { themes } from '@/utils/theme';
import { FiLink } from 'react-icons/fi';
import Link from 'next/link';

export const PortfolioCard = (props: ProjectType) => {
  return (
    <Card>
      <Image
        src={props.imageUrl}
        alt={props.title}
        layout='responsive'
        objectFit='contain'
      />
      <CardDescription>
        <div className='title'>{props.title}</div>
        <div className='description'>{props.description}</div>
        <Link
          href={props.url ?? ''}
          target='_blank'
          rel='noreferrer'
        >
          <FiLink
            size='3rem'
            color='white'
          />
        </Link>
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
  gap: 1rem;
  padding: 3rem 2rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #10131acc;
  backdrop-filter: blur(3px);
  transition: transform 0.5s ease-in-out;
  transform: translateY(100%);
  ${Card}:hover & {
    background-color: rgb(0 0 0 / 50%);
  }
  height: 100%;
  .title {
    font-size: 20px;
    font-weight: 900;
    color: rgba(255, 255, 255, 1);
  }

  .description {
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    margin-top: 0.5rem;
  }
  ${Card}:hover & {
    transform: translateY(0);
  }
`;
