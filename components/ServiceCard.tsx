import { themes } from '@/utils/theme';
import styled from 'styled-components';
import { Text } from './ColoredText';
import { FaCode } from 'react-icons/fa';
import serviceCardBg from '@/assets/images/service_card.png';
import Image from 'next/image';

interface ServicesProps {
  id: number;
  title: string;
  description: string;
  icon: string | React.ReactNode;
}

export const ServiceCard = ({
  id,
  title,
  description,
  icon,
}: ServicesProps) => {
  return (
    <ServiceCardContainer>
      <ServiceCardBd>
        <Image
          src={serviceCardBg}
          alt='service card background'
          layout='fill'
          objectFit='container'
        />
      </ServiceCardBd>
      <ServiceCardImage>{icon}</ServiceCardImage>
      <ServiceCardContent>
        <div className='title'>
          <Text transformed='capitalize'>{title}</Text>
        </div>
        <div className='description'>
          <p>{description}</p>
        </div>
      </ServiceCardContent>
    </ServiceCardContainer>
  );
};

const ServiceCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0rem 3rem;
  margin-top: 0rem;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  position: relative;

  &:nth-child(2),
  &:nth-child(4) {
    margin-top: 2.3rem;
  }

  @media (max-width: 768px) {
    padding: 0rem 1rem;
    height: 400px;

    &:nth-child(2),
    &:nth-child(4) {
      margin-top: 0rem;
    }
  }
`;

const ServiceCardBd = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ServiceCardImage = styled.div`
  z-index: 2;
  color: #13a7d4;
`;

const ServiceCardContent = styled.div`
  z-index: 2;
  .title {
    text-align: center;
    div {
      font-size: 1.5rem !important;
      font-weight: 900;
    }
  }

  .description {
    margin-top: 1rem;
    p {
      margin-bottom: 1rem;
      color: ${themes.tertiary};
    }
  }
`;
